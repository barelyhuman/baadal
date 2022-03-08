import {createClient, dedupExchange, fetchExchange} from '@urql/core'
import {authExchange} from '@urql/exchange-auth'
import {createUrqlRequester} from 'urql-generic-requester'
import {getSdk} from './generated'
import {getAuth, addAuthToOperation, didAuthError} from './exchanges'
import {LOCALSTORAGE} from 'constants/storage'

const client = createClient({
	url: 'http://localhost:3000/api/graphql',
	exchanges: [
		dedupExchange,
		authExchange({didAuthError, getAuth, addAuthToOperation}),
		fetchExchange,
	],
})

const requestor = createUrqlRequester(client)

const generatedSDK = getSdk(requestor)

type GeneratedSDKType = typeof generatedSDK

interface SDK extends GeneratedSDKType {
	authorizeSpotify: (query: string) => Promise<any>
}

export const musyncSDK: SDK = Object.assign({}, generatedSDK, {
	authorizeSpotify(queryParams: string) {
		const urlSP = new URLSearchParams(queryParams)
		const headers: any = {}
		const token = localStorage.getItem(LOCALSTORAGE.AUTHTOKEN)
		if (token) {
			headers.authorization = token
		}

		return fetch('/api/spotify?' + urlSP.toString(), {
			headers: headers,
		}).then(res => {
			if (!res.ok) {
				throw res
			}
			return res
		})
	},
})
