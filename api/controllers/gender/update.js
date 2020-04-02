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
            let existData = await Gender.findOne({
                id: inputs.id
            }).intercept((err) => {
                return new Error(err.message)
            });

            if (!existData) throw new Error("data not found");

            let gender = {}

            if (inputs.name) gender.name = inputs.name

            let update = await Gender.updateOne({
                id: inputs.id
            })
                .set(gender)
                .intercept((err) => {
                    return new Error(err.message)
                })

            if (update) {
                let data = await Gender.findOne({
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
