const dns = require("dns")
const {promisify} = require("util")

const domain = process.env.DOMAIN;
const txt = promisify(dns.resolveTxt)

describe("Root SPF Record", () => {
    const SPF = txt(domain)
        .then(p => 
            p
                .map(q => q.join(""))
                .filter(p => p.startsWith("v=spf1"))
        )

    test("Has SPF Record", async () => {
        expect((await SPF).length)
            .toBeGreaterThan(0)
    })

    test("Has exactly 1 SPF Record", async () => {
        expect((await SPF).length)
            .toEqual(1)
    })

    test("SPF Record passes simple regex", async () => {
        expect((await SPF)[0])
            .toMatch(/^v=spf1(\s+[\+-\?\~]?(a|mx|all|include|ptr|ip4|ip6|exists)(:\S+)?)+$/)
    })

    test("SPF Record has only 1 default", async () => {
        const elements = (await SPF)[0]
        const defaults = elements
            .split(" ")
            .filter(p => p.endsWith("all"))

        expect(defaults.length)
            .toEqual(1)
    })

    test("Hardfails by default", async () => {
        const elements = (await SPF)[0]
        const defaults = elements
            .split(" ")
            .filter(p => p.endsWith("all"))

        expect(defaults[0][0])
            .toEqual('-')
    })
})