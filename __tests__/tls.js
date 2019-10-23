const https = require("https")

const testTLS = (host, version) => new Promise((resolve, reject) => {  
    try {
    https.request({
        hostname: host,
        port: 443,
        method: 'GET',
        maxVersion: version,
        minVersion: version
    }, res => {
      resolve()
    }).on('error', err => {
      reject(err)
    }).end()
} catch (e) {
    reject(e)
}
})

describe("TLS Configuration", () => {
    test("Does not support TLS 1.0", () => expect(testTLS("www.jrtapsell.co.uk", "TLSv1")).rejects.toThrow())
    test("Does not support TLS 1.1", () => expect(testTLS("www.jrtapsell.co.uk", "TLSv1.1")).rejects.toThrow())
    test("Supports TLS 1.2", () => expect(testTLS("www.jrtapsell.co.uk", "TLSv1.2")).resolves.toEqual(undefined))
    test("Supports TLS 1.3", () => expect(testTLS("www.jrtapsell.co.uk", "TLSv1.3")).resolves.toEqual(undefined))
})