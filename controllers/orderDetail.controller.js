const db = require('../config/database');

exports.getOrderDetails = async (req, res) => {
  try {
    const sql = `SELECT * FROM orderDetails;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of order detail sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createOrderDetails = async (req, res) => {
  const { orderId, productId, price, quantity, total } = req.body;
  const sql = `INSERT INTO orderDetails(orderId, productId, price, quantity, total ) 
  VALUES ('${orderId}', '${productId}', '${price}', '${quantity}', '${total}')`;
  const { rows } = await db.query(sql);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Order added successfully!',
      body: {
        data: { orderId, productId, price, quantity, total },
      },
    });
  }
};

exports.updateOrderDetails = async (req, res) => {
  const { orderId, productId, price, quantity, total } = req.body;
  const id = req.params.orderId;
  const sqlupdate = `UPDATE orderDetails SET 
  orderId = '${orderId}',
  productId = '${productId}',
  price = '${price}',
  quantity = '${quantity}',
  total = '${total}'
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
        data: { orderId, productId, price, quantity, total },
      },
    });
  }
};

exports.deleteOrderDetails = async (req, res) => {
  const id = req.params.orderId;
  const { rows } = await db.query(`SELECT id FROM orderDetails WHERE id = $1`, [
    id,
  ]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from orderDetails where id = $1', [id]);
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
