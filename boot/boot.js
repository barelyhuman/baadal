const runner = require('npm-run-all')

const isDev = process.argv.indexOf('--dev') > -1

const commands = ['g:options', 'g:client']

if (isDev) {
	commands.push('next:dev')
} else {
	commands.push('build')
}

console.log('running commands:', commands)
runner(commands, {
	parallel: false,
	stdout: process.stdout,
	stderr: process.stderr,
})
