import {prismaClient} from './client'

async function main() {
	// execute seed functions here
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prismaClient.$disconnect()
	})
