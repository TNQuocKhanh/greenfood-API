const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/database');
const db = require('../config/database');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const data = await client.query(`SELECT * FROM customers WHERE email= $1;`, [
    email,
  ]);
  const arr = data.rows;
  if (arr.length != 0) {
    return res.status(400).json({
      error: 'Email already exists.',
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 4);
    const newUser = {
      username,
      email,
      password: hashPassword,
    };
    const sql = `INSERT INTO customers (username, email, password) VALUES ('${newUser.username}', '${newUser.email}', '${newUser.password}')`;
    const { rows } = client.query(sql);

    res.status(200).send({
      message: 'Register successfully!',
    });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  const id = req.params.userId;
  const hashPassword = await bcrypt.hash(password, 4);

  const sqlupdate = `UPDATE customers SET 
  password= '${hashPassword}' WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Change password successfully!',
      body: {
        user: { email },
      },
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // const id = req.params.userId;

  const newPassword = 'randomPassword';

  const hashPassword = await bcrypt.hash(newPassword, 4);

  const sqlupdate = `UPDATE customers SET
  password= '${hashPassword}' WHERE email = '${email}'`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Forgot password!',
      body: {
        data: { email },
      },
    });
  }
};
