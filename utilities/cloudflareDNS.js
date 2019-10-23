const fetch = require("node-fetch")

function request(options) {
    return fetch(
        `https://cloudflare-dns.com/dns-query?name=${options.domain}&type=${options.type}&do=true`,
        {
            headers: {
                "accept": "application/dns-json"
            }
        }).then(p => p.json())
}

module.exports = {
    async dnssec(domain) {
        const fet = await request({domain, type: "NS"})
            .then(p => p.AD)
        return fet
    }
}