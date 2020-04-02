module.exports = {
    friendlyName: 'Create',

    description: 'Create costumer.',

    inputs: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
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
            let costumer = await Costumer.create({
                name: inputs.name,
                email: inputs.email
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
                    result: costumer
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
