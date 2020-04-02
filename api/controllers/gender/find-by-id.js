module.exports = {
    friendlyName: 'Find by Id',

    description: 'Find costumer by id.',

    inputs: {
        id: {
            type: 'number',
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
            let data = await Gender.findOne({
                id: inputs.id
            }).intercept((err) => {
                return new Error(err.message)
            });

            if (!data) throw new Error("data not found");

            return exits.success({
                status: 'success',
                message: 'Gender successfully created',
                result: data
            });
        }
        catch (err) {
            return exits.serverError({
                status: 'failed',
                message: err.message
            })
        }
    }
};
