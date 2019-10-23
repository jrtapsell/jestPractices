const args = process.argv

if (args.length !== 3) {
    console.error("Please launch passing only a domain to test")
    process.exit(1)
}

process.env.DOMAIN = args[2]

process.argv = [
    process.argv[0],
    process.argv[1],
    '--verbose'
]

require('jest-cli/bin/jest');