import {
	ResolversEnhanceMap,
	applyResolversEnhanceMap,
} from '@generated/type-graphql'
import {ContextType} from 'common/types'
import {ForbiddenError, ResolverData, UseMiddleware} from 'type-graphql'
import {MiddlewareFn} from 'type-graphql'

export const AuthCheck: MiddlewareFn<ContextType> = ({context}, next) => {
	if (!context.user) {
		throw new ForbiddenError()
	}
	return next()
}

type Rule = (
	_data: ResolverData<ContextType>,
	resolved: any,
) => Promise<boolean>

export const OwnerCheck = (rule: Rule) => {
	const checker: MiddlewareFn<ContextType> = async (action, next) => {
		const response = await next()
		const allow = await rule(action, response)
		if (!allow) {
			throw new ForbiddenError()
		}
	}
	return checker
}

export const isUserOwner = () =>
	UseMiddleware(
		OwnerCheck(async ({root, context}, resolved) => {
			return context.user?.id === resolved.id
		}),
	)

export function initGuards() {
	const resolversEnhanceMap: ResolversEnhanceMap = {
		// can be used to add RBAC level permissionsy
	}

	applyResolversEnhanceMap(resolversEnhanceMap)
}
