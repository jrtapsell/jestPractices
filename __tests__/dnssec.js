const dns = require("../utilities/cloudflareDNS")
const domain = process.env.DOMAIN;

describe("Checking DNSSEC", () => {
    test("Resolves via DNSSEC", async () => {
        const ad = await dns.dnssec(domain)
        expect(ad).toEqual(true)
    })
})