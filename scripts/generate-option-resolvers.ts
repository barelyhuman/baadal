import 'reflect-metadata'
import {SourceFile, Project, ClassDeclaration} from 'ts-morph'
import {join} from 'path'
import {optionMappings} from 'mappings/options'
import {OptionIdentifierMapping} from 'common/option'
import _ from 'lodash'

interface CreateFileOptions {
	model: string
	optionIdentifiers: OptionIdentifierMapping[]
}

const outpath = (file: string) =>
	join(__dirname, '..', 'graphql', 'generated', file)

function addBaseImports(file: SourceFile, model: string) {
	file.addImportDeclaration({
		namedImports: [model],
		moduleSpecifier: '@generated/type-graphql',
	})
	file.addImportDeclaration({
		namedImports: ['FieldResolver', 'Resolver', 'Root', 'Ctx'],
		moduleSpecifier: 'type-graphql',
	})
	file.addImportDeclaration({
		namedImports: ['findOptionByValue'],
		moduleSpecifier: 'constants/options',
	})
}

const pascalCase = (str: string) =>
	_.startCase(_.camelCase(str)).split(' ').join('')

function addResolverClass(file: SourceFile, model: string) {
	const resolverName = pascalCase(model + '-' + 'OptionResolver')

	const classDeclaration = file.addClass({
		isExported: true,
		name: resolverName,
		decorators: [
			{
				name: 'Resolver',
				arguments: [model],
			},
		],
	})

	return classDeclaration
}

function createOptionFile(
	project: Project,
	filename: string,
	options: CreateFileOptions,
) {
	const optionResolverFile = project.createSourceFile(outpath(filename), '', {
		overwrite: true,
	})

	addBaseImports(optionResolverFile, options.model)

	const resolverClass = addResolverClass(optionResolverFile, options.model)

	options.optionIdentifiers.forEach(
		(optionMapping: OptionIdentifierMapping) => {
			addFieldResolver(options.model, resolverClass, optionMapping)
		},
	)

	optionResolverFile.formatText()
}

function addFieldResolver(
	model: string,
	classDefinition: ClassDeclaration,
	mapping: OptionIdentifierMapping,
) {
	classDefinition.addMethod({
		name: 'roleLabel',
		isAsync: true,
		decorators: [
			{
				name: 'FieldResolver',
				arguments: [
					writer => {
						writer.write('()=>String')
					},
				],
			},
		],
		statements: writer => {
			writer.writeLine(
				`return findOptionByValue("${
					mapping.optionIdentifier
				}", ${model.toLowerCase()}.${mapping.optionField}).label`,
			)
		},
		parameters: [
			{
				decorators: [
					{
						name: 'Root',
						arguments: [],
					},
				],
				name: model.toLowerCase(),
				type: model,
			},
		],
	})
}

async function generate() {
	const project = new Project({})

	const optionIndexFile = project.createSourceFile(outpath('index.ts'), '', {
		overwrite: true,
	})

	for (let option of optionMappings) {
		const fileName = option.model.toLowerCase() + '-option-resolver'
		const fileNameWithExt = fileName + '.ts'

		createOptionFile(project, fileNameWithExt, option)

		optionIndexFile.addExportDeclaration({
			moduleSpecifier: './' + fileName,
		})
	}

	optionIndexFile.formatText()

	await project.save()
}

generate()
