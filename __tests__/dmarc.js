const dns = require("dns")
const {promisify} = require("util")

const domain = process.env.DOMAIN;
const txt = promisify(dns.resolveTxt)

describe("Checking DMARC", () => {
    test("Has a DMARC record", async () => {
        let record = null;
        try {
            record = await txt(`_dmarc.${domain}`)
        } catch(e) {}
        expect(record).not.toEqual(null)
    })
})