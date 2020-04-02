module.exports = {
    friendlyName: 'Find All',

    description: 'Find all costumer.',

    inputs: {
        // name: {
        //     type: 'string',
        //     required: true
        // },
        // email: {
        //     type: 'string',
        //     required: true,
        //     email: true
        // },
        // state: {
        //     type: 'string'
        // }
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
            let data = await Gender.find().intercept((err) => {
                return new Error(err.message)
            });

            if (data.length < 1) throw new Error("data not found");

            return exits.success({
                status: 'success',
                message: 'Costumer successfully created',
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
