import {PrismaClient} from '@prisma/client'
import knex from 'knex'

function createFallbackClient() {
	return knex({
		client: 'pg',
		connection: process.env.DATABASE_URL,
	})
}

function createPrismaClient() {
	return new PrismaClient()
}

export const prismaClient = createPrismaClient()
export const fallBackDBClient = createFallbackClient()
