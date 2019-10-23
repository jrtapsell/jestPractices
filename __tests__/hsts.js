const fetch = require("node-fetch")
const url = require("url")

const domain = process.env.DOMAIN;
const originalURL = url.parse(`https://${domain}/`)

describe('HTTP Root Domain', () => {
    const httpResponse = fetch(`http://${domain}`, {redirect: "manual"})

    test('Has no HSTS header', async () => {
        const headers = (await httpResponse).headers
        expect(headers.get("strict-transport-security"))
            .toEqual(null)
    })
    
    test('Redirects via apex domain', async () => {
        const headers = (await httpResponse).headers

        const newURL = url.parse(headers.get("location"))

        expect(newURL.host)
            .toEqual(originalURL.host)
    })
})

describe('HTTPS Root Domain', () => {
    const httpsResponse = fetch(`https://${domain}`, {redirect: "manual"})

    test('Has HSTS header', async () => {
        const headers = (await httpsResponse).headers
        expect(headers.get("strict-transport-security"))
            .not
            .toEqual(null)
    })
})

describe('WWW Domain', () => {
    const httpsResponse = fetch(`http://www.${domain}`, {redirect: "manual"})

    test('Redirects to HTTPS', async () => {
        const headers = (await httpsResponse).headers
        const destination = url.parse(headers.get("location"))
        if (destination) {
            expect(destination.protocol)
                .toEqual("https:")
        }
    })
})