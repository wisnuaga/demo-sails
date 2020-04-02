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
            let existData = await Costumer.findOne({
                id: inputs.id
            }).intercept((err) => {
                return new Error(err.message)
            });

            if (!existData) throw new Error("data not found");

            let data = await Costumer.destroyOne({
                id: inputs.id
            }).intercept((err) => {
                return new Error(err.message)
            });

            return exits.success({
                status: 'success',
                message: 'Costumer successfully deleted',
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
