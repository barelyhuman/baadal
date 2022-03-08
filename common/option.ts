export interface OptionMapping {
	model: string
	optionIdentifiers: OptionIdentifierMapping[]
}

export type OptionIdentifierMapping = {
	optionField: string
	optionIdentifier: string
}
