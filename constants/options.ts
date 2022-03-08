export interface Option {
	label: string
	sequence: number
	value: number
}

export interface OptionCollection {
	[key: string]: {
		[key: string]: Option
	}
}

export const options: OptionCollection = {
	GENDER: {
		none: {
			label: 'None',
			sequence: 1,
			value: 1,
		},
	},
}

export function findOptionByValue(identifier: string, value: number): Option {
	let result: Option = {
		label: '',
		sequence: 0,
		value: 0,
	}
	if (!options[identifier]) {
		throw new Error(
			'Invalid option identifer, please recheck the identifier name in schema.prisma, the table using the identifier',
		)
	}
	for (const key of Object.keys(options[identifier])) {
		if (options[identifier][key].value !== value) {
			continue
		}

		result = options[identifier][key]
	}

	return result
}
