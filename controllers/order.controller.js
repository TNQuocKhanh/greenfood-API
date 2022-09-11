const db = require('../config/database');

exports.getOrder = async (req, res) => {
  try {
    const sql = `SELECT * FROM orders;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of order sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createOrder = async (req, res) => {
  const { customerId, paymentId, orderDate } = req.body;
  const sql = `INSERT INTO orders(customerId, paymentId, orderDate ) VALUES ('${paymentType}', '${paymentId}', '${orderDate}')`;
  const { rows } = await db.query(sql);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Order added successfully!',
      body: {
        data: { customerId, paymentId, orderDate },
      },
    });
  }
};

exports.updateOrder = async (req, res) => {
  const { customerId, paymentId, orderDate, info } = req.body;
  const id = req.params.orderId;
  const sqlupdate = `UPDATE orders SET customerId = '${customerId}',
  paymentId = '${paymentId}',
  orderDate = '${orderDate}',
  info = '${info}'
  WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Order updated successfully!',
      body: {
        data: { customerId, paymentId, orderDate, info },
      },
    });
  }
};

exports.deleteOrder = async (req, res) => {
  const id = req.params.orderId;
  const { rows } = await db.query(`SELECT id FROM orders WHERE id = $1`, [id]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from orders where id = $1', [id]);
    res.status(201).send({
      message: `Order was removed successfully!`,
    });
  } else {
    res.status(503).send({
      message: `Order not exist!`,
    });
  }
  res.status(201).send();
};
