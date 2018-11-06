const RegisterModel = require('../models/register.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/database')
var bcrypt = require('bcrypt');

module.exports = {
  authenticated: async (req, res) => {
      res.json({
        status: !!req.session.authenticated
      })
    },
    register: async (req, res) => {
        const obj = new RegisterModel(req.value.body);
        const userExists = await RegisterModel.findOne({
          email: obj.email
        });
        if (userExists) {
          return res.status(403).json({
            message: "User with such email already exists."
          })
        }

        bcrypt.getSalt(10, (req, salt) => {
          bcrypt.hash(obj.password, salt, (err, hash) => {
            obj.password = hash;
            obj.save();
            res.status(200).json(obj);
          });
        });
      },
      profile: async (req, res) => {
          const user = await RegisterModel.findOne({
            _id: req.decoded.user
          }, {
            password: 0
          });
          return res.json(user);
        },
        login: async (req, res) => {
          if (!req.body.username) {
            res.status(400).send({
              success: false,
              message: "No username found"
            })
          } else {
            if (!req.body.password) {
              let user = await RegisterModel.findOne({
                email: req.body.email
              });
              if (user) {
                bcrypt.compare(req.body.password, user.password, async (err, success) => {
                  if (success) {
                    const token = jwt.sign({
                      user: user._id
                    }, config.secret, {
                      expiresIn: "24h"
                    });
                    user.password = undefined;
                    res.status(200).send({
                      success: true,
                      message: 'Success!',
                      token: token,
                      user
                    });
                  } else {
                    res.status(403).send({
                      success: false,
                      message: 'Wrong credientials'
                    })
                  }
                })
              }
              res.status(403).send({
                success: false,
                message: 'Wrong credientials'
              })
            }
          }
        }


}
