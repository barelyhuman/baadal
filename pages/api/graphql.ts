import 'reflect-metadata'

import {resolvers} from '@generated/type-graphql'
import {options} from 'constants/options'
import {GraphQLSchema} from 'graphql'
import {
	getGraphQLParameters,
	processRequest,
	renderGraphiQL,
	Request,
	sendResult,
	shouldRenderGraphiQL,
} from 'graphql-helix'
import {initGuards} from 'graphql/rules/guards'
import {NextApiHandler} from 'next'
import {prismaClient} from 'prisma/client'

import {buildSchema, NonEmptyArray} from 'type-graphql'
import {UserOptionResolver} from 'graphql/generated'

// Simple alias for the resolver types
type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>

let schema: GraphQLSchema

const toIgnore = ['PostCrudResolver']

const toAdd = [UserOptionResolver]

const allResolvers = [...resolvers, ...toAdd].filter(x => {
	return toIgnore.indexOf(x.name) === -1
}) as Resolvers

async function generateSchema() {
	initGuards()

	schema = await buildSchema({
		validate: false,
		resolvers: allResolvers,
		emitSchemaFile: {
			path: 'schema.gql',
		},
	})
}

const graphqlHandler: NextApiHandler = async (req, res) => {
	try {
		await generateSchema()

		const request: Request = {
			body: req.body,
			headers: req.headers,
			method: req.method || '',
			query: req.query,
		}

		if (shouldRenderGraphiQL(request)) {
			res.send(
				renderGraphiQL({
					endpoint: '/api/graphql',
				}),
			)
			return
		}

		// Extract the GraphQL parameters from the request
		const {operationName, query, variables} = getGraphQLParameters(request)

		// Validate and execute the query
		const result = await processRequest({
			operationName,
			query,
			variables,
			request,
			schema: schema,
			// add authentication using context modification
			// the below is some example code for the same
			// contextFactory: async context => {
			// 	// const token: string | undefined =
			// 	// 	// @ts-ignore
			// 	// 	context.request.headers[AUTH_HEADER] ||
			// 	// 	// @ts-ignore
			// 	// 	context.request.headers[AUTH_HEADER.toLowerCase()]
			// 	// let user
			// 	// if (token) {
			// 	// 	user = await getUserForToken(token)
			// 	// }
			// 	// return {
			// 	// 	...context,
			// 	// 	prisma: prismaClient,
			// 	// 	options,
			// 	// 	user: user,
			// 	// }
			// },
		})

		return sendResult(result, res)
	} catch (err: any) {
		console.error(err?.details || err)
	}
}

export default graphqlHandler
