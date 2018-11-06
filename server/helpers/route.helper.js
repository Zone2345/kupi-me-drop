const Joi = require("joi");

module.exports = {
  validateParams: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({
        param: req["params"][name]
      }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value)
          req.value = {};
        if (!req.value["params"])
          req.value["params"] = {};
        req.value["params"][name] = result.value.param;
        next();
      }
    }
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value)
          req.value = {};
        if (!req.value["body"])
          req.value["body"] = {}
        req.value["body"] = result.value;
        next();
      }
    }
  },
  schemas: {
    objectId: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    id: Joi.object().keys({
      param: Joi.number().min(0).required()
    }),
    string: Joi.object().keys({
      param: Joi.string().required()
    }),
    category: {
      required: Joi.object().keys({
        description: Joi.string().required(),

      })
    },
    product: {
      required: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        photo: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        created: Joi.date().timestamp().required()
      })
    },
    like: {
      create: Joi.object().keys({
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      })
    },

    user: {
      update: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        username: Joi.string(),
        password: Joi.string(),
        profilePhoto: Joi.string(),
        coverPhoto: Joi.string(),
        gender: Joi.string(),
        birthDate: Joi.date().timestamp(),
        role: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        ban: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow('', null),
        created: Joi.date().timestamp()
      }),
    },
    auth: {
      login: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
      }),
      register: Joi.object().keys({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    role: {
      required: Joi.object().keys({
        name: Joi.string().required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        created: Joi.date().timestamp().required()
      })
    },
    ban: {
      required: Joi.object().keys({
        bannedAt: Joi.date().timestamp().required(),
        reason: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        bannedBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      })
    },
    banReason: {
      required: Joi.object().keys({
        reason: Joi.string().required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        created: Joi.date().timestamp().required()
      })
    }
  }
};
