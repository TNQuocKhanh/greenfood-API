const db = require('../config/database');

exports.getPayment = async (req, res) => {
  try {
    const sql = `SELECT * FROM payment;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of payment sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createPayment = async (req, res) => {
  const { paymentType } = req.body;
  const sql = `INSERT INTO payment(paymentType) VALUES ('${paymentType}')`;
  const { rows } = await db.query(sql);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Payment added successfully!',
      body: {
        data: { paymentType },
      },
    });
  }
};

exports.updatePayment = async (req, res) => {
  const { paymentType, paymentStatus, paymentDate } = req.body;
  const id = req.params.paymentId;
  const sqlupdate = `UPDATE payment SET paymentType = '${paymentType}',
  paymentStatus = '${paymentStatus}',
  paymentDate = '${paymentDate}'
  WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Payment updated successfully!',
      body: {
        data: { paymentType, paymentStatus, paymentDate },
      },
    });
  }
};

exports.deletePayment = async (req, res) => {
  const id = req.params.paymentId;
  const { rows } = await db.query(`SELECT id FROM payment WHERE id = $1`, [id]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from payment where id = $1', [id]);
    res.status(201).send({
      message: `Payment was removed successfully!`,
    });
  } else {
    res.status(503).send({
      message: `Payment not exist!`,
    });
  }
  res.status(201).send();
};
