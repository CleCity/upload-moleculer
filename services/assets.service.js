const Service = require("moleculer").Service;
const {ServiceBroker} = require("moleculer");
const {MoleculerError} = require("moleculer").Errors;
const Fs = require('fs').promises;
const uuidv4 = require('uuid/v4');
const gm = require('gm');
/**
 * AssetService service class
 * @extends Service
 */
class AssetsService extends Service {
    /** @constructor
     * @param {ServiceBroker} broker - Moleculer's service broker
     */
    constructor(broker) {
        let client;
        super(broker);

        this.parseServiceSchema({
            name: "assets",
            hooks: {
                after: {
                    "*": function(ctx, res) {
                        res = {
                            data: res,
                            newToken: ctx.meta.newToken
                        };
                        return res;
                    },
                },
            },
            /* Service settings */
            settings: {},

            /* Service dependencies */
            dependencies: [],

            /* Actions */
            actions: {
                ping: this.ping,
                thumbnail: {
                    handler(ctx){
                        return new this.Promise(async (res,rej) => {
                            const name = uuidv4();
                            console.log(ctx.params);
                            gm(ctx.params).selectFrame(0).write(`./${name}.jpg`,async err => {
                                if (err) rej(err)
                                const thumbnail = await Fs.readFile(`./${name}.jpg`)
                                .catch(e => {
                                    this.broker.emit("error", {
                                        service: ctx.service.name,
                                        action: ctx.action.rawName,
                                        caller: ctx.meta.caller,
                                        message: e.message
                                    });
                                    throw new MoleculerError(e.message, HTTP_CODE.INTERVAL_ERROR, "ERROR MONGO", {
                                        node: 'assets node'
                                    });
                                })
                                console.log('ok');
                                res(thumbnail.toString('base64'));
                            })
                        })
                    }
                },
            },

            /* Events */
            events: {},

            /* Methods */
            methods: {},

            /* Service created lifecycle event handler */
            created: () => {},
            /* Service started lifecycle event handler */
            started:  () => {},
            /* Service stopped lifecycle event handler */
            stopped: async () => {}
        });
    }

    /** Ping action used to monitor the health of this service.
     * @returns {String} "pong"
     *
     * @example
     *	GET /v1/assets/ping
     *
     */
    async ping() {
        return "pong"
    }
}

module.exports = AssetsService;
