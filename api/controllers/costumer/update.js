module.exports = {
    friendlyName: 'Update',

    description: 'Update costumer.',

    inputs: {
        id: {
            type: 'number',
            required: true
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
            email: true
        },
        state: {
            type: 'string'
        }
    },

    exits: {
        success: {
            responseType: 'ok'
        },
        notFound: {
            responseType: 'notFoundResponse'
        },
        badRequest: {
            responseType: 'badRequest'
        },
        forbidden: {
            responseType: 'forbidden'
        },
        exist: {
            responseType: 'existResponse'
        },
        serverError: {
            responseType: 'serverError'
        }
    },

    fn: async function (inputs, exits) {
        try {
            let existData = await Costumer.findOne({
                id: inputs.id
            }).intercept((err) => {
                return new Error(err.message)
            });

            if (!existData) throw new Error("data not found");

            let costumer = {}

            if (inputs.name) costumer.name = inputs.name
            if (inputs.email) costumer.email = inputs.email
            if (inputs.state) costumer.state = inputs.state

            let update = await Costumer.updateOne({
                id: inputs.id
            })
                .set(costumer)
                .intercept((err) => {
                    return new Error(err.message)
                })

            if (update) {
                let data = await Costumer.findOne({
                    id: inputs.id
                }).intercept((err) => {
                    return new Error(err.message)
                });

                return exits.success({
                    status: 'success',
                    message: 'Costumer successfully updated',
                    result: data
                });
            }

        }
        catch (err) {
            return exits.serverError({
                status: 'failed',
                message: err.message
            })
        }
    }
};
