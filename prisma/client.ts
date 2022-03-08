import {PrismaClient} from '@prisma/client'
import {findOptionByValue, options} from 'constants/options'

export const prismaClient = new PrismaClient()

// prismaClient.$use(async (params, next) => {
// 	const response = await next(params)
// 	let through = response
// 	if (!Array.isArray(response)) {
// 		through = []
// 		through.push(response)
// 	}

// 	let result: any = []
// 	for (let value of through) {
// 		const optionsKeys = Object.keys(value).filter(x => x.includes('OptionId'))
// 		optionsKeys.forEach(optionKey => {
// 			const withoutIdentifier = optionKey.split('OptionId')[0]
// 			const identifier = value[optionKey]
// 			const optionValue = value[withoutIdentifier]
// 			const option = findOptionByValue(identifier, optionValue)
// 			value.roleLabel = option.label
// 		})
// 		result.push(value)
// 	}

// 	return result.map((item: any) => {
// 		item.x = 'y'
// 		return item
// 	})
// })
