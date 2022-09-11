const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  try {
    const sql = `SELECT * FROM customers;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of users sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const sql = `INSERT INTO customers(username, password, email, role) VALUES ('${username}', '${password}','${email}', '${role}')`;
  const { rows } = await db.query(sql);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'User wad added successfully!',
      body: {
        product: { username, password, email },
      },
    });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, address, phonenumber } = req.body;
  const id = req.params.userId;
  const sqlupdate = `UPDATE customers SET 
  username= '${username}', 
  email = '${email}',
  address = '${address}',
  phonenumber = '${phonenumber}' WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'User was updated successfully!',
      body: {
        user: { username, email, address, phonenumber },
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  const { rows } = await db.query(`select id from customers where id = $1`, [
    id,
  ]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from customers where id = $1', [id]);
    res.status(201).send({
      message: `User was removed successfully!`,
    });
  } else {
    res.status(503).send({
      message: `User is not exist!`,
    });
  }
  res.status(201).send();
};
