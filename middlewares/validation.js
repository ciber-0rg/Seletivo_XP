const joi = require('../helpers/JOI');

module.exports = {
   withdrawal: (req, res, next) => {
        const { error } = joi.withdrawDTO.validate(req.body);

        if (error) {
            const [code, message] = error.message.split('|');
            return res.status(code).json({ message });
        }
        next();
    },

    login: (req, res, next) => {
        const { error } = joi.loginDTO.validate(req.body);
        if (error) {
            const error1 = error.details[0].message;
            if (error1 === '"email" must be a valid email') {
                return res.status(400).json({ message: 'Invalid fields' });
            }
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        return next();
    },
};