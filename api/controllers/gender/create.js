module.exports = {
    friendlyName: 'Create',

    description: 'Create costumer.',

    inputs: {
        name: {
            type: 'string',
            required: true
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
            let data = await Gender.create({
                name: inputs.name
            }).intercept((err) => {
                return new Error(err.message)
            }).exec(async (err, data, wasCreated) => {
                if (err) {
                    return exits.serverError({
                        status: 'failed',
                        message: err.message
                    })
                }
                return exits.success({
                    status: 'success',
                    message: 'Costumer successfully created',
                    result: data
                });
            })
        }
        catch (err) {
            return exits.serverError({
                status: 'failed',
                message: err.message
            })
        }
    }
};
