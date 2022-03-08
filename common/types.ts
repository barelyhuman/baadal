import {PrismaClient, User} from '@prisma/client'
import {options} from 'constants/options'
import {ExecutionContext} from 'graphql-helix'
import {Field, ObjectType} from 'type-graphql'

export type ContextType = ExecutionContext & {
	prisma: PrismaClient
	options: typeof options
	user?: User
}

@ObjectType()
export class SimpleSuccessResponse {
	@Field(type => Boolean)
	success!: boolean
}
