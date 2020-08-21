/** This service is automatically generated by Moleculer */

const ApiGateway = require("moleculer-web");
const { MoleculerError } = require("moleculer").Errors;

module.exports = {
    name: "api",
    mixins: [ApiGateway],

    // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
    settings: {
        path:"/upload",
        port: process.env.PORT || 3001,
        routes: [
            {
                path: "",

                // You should disable body parsers
                bodyParsers: {
                    json: false,
                    urlencoded: false
                },

                aliases: {
                    "GET /ping": "assets.ping",
                    "POST /": "multipart:assets.thumbnail"
                },
                mappingPolicy: "restrict"
            }
        ]
    },

    methods: {}
};