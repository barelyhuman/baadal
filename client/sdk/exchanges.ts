import {
	CombinedError,
	makeOperation,
	Operation,
	OperationContext,
	OperationResult,
	TypedDocumentNode,
} from '@urql/core'
import {LOCALSTORAGE} from 'constants/storage'
import {DocumentNode} from 'graphql'

interface AuthConfigGetState<T> {
	authState: T | null
	/** The mutate() method may be used to send one-off mutations to the GraphQL API for the purpose of authentication. */
	mutate<Data = any, Variables extends object = {}>(
		query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
		variables?: Variables,
		context?: Partial<OperationContext>,
	): Promise<OperationResult<Data>>
}

interface AuthConfigAddAuthToOperation<T> {
	authState: T | null
	operation: Operation
}

interface AuthConfigDidAuthError<T> {
	error: CombinedError
	authState: T | null
}

export const didAuthError = ({error}: AuthConfigDidAuthError<any>) => {
	const errored = error.graphQLErrors.some(e =>
		e.message.includes('Not Authorised'),
	)
	if (errored) {
		window.location.pathname = '/login'
	}
	return errored
}

export const addAuthToOperation = ({
	authState,
	operation,
}: AuthConfigAddAuthToOperation<any>) => {
	if (!authState || !authState.token) {
		return operation
	}

	const fetchOptions =
		typeof operation.context.fetchOptions === 'function'
			? operation.context.fetchOptions()
			: operation.context.fetchOptions || {}

	return makeOperation(operation.kind, operation, {
		...operation.context,
		fetchOptions: {
			...fetchOptions,
			headers: {
				...fetchOptions.headers,
				Authorization: authState.token,
			},
		},
	})
}

export async function getAuth<T>({authState, mutate}: AuthConfigGetState<T>) {
	if (typeof window === 'undefined') {
		return
	}
	if (!authState) {
		const token = window.localStorage.getItem(LOCALSTORAGE.AUTHTOKEN)
		if (token) {
			return {token}
		}
		return null
	}

	return null
}
