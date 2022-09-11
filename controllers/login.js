const bcrypt = require('bcrypt');
const client = require('../config/database');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(
      `SELECT * FROM customers WHERE email= $1;`,
      [email]
    );
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: 'User is not registered. Please register for using...',
      });
    } else {
      await bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: 'Server error',
          });
        } else if (result === true) {
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            message: 'User signed in!',
            token: token,
            info: _.omit(data.rows[0], 'password'),
          });
        } else {
          if (result != true)
            res.status(400).json({
              error: 'Enter correct password!',
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    });
  }
};
