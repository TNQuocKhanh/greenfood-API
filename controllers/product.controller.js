const db = require('../config/database');

exports.getProducts = async (req, res) => {
  try {
    const sql = `SELECT * FROM products order by id;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of products sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createProduct = async (req, res) => {
  const { categoryId, name, price, description } = req.body;
  const sqltest = `INSERT INTO products(categoryId, name, price, description) VALUES ('${categoryId}', '${name}','${price}', '${description}')`;
  const { rows } = await db.query(sqltest);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter your infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Product added successfully!',
      body: {
        product: { categoryId, name, price, description },
      },
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { categoryId, name, image, quantity, price, description, review } =
    req.body;
  const id = req.params.productId;
  const sqlupdate = `UPDATE products SET categoryId= '${categoryId}',
  name = '${name}',
  image = '${image}', 
  quantity = '${quantity}', 
  description = '${description}', 
  price = '${price}',
  review = '${review}'
  WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter your infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Product updated successfully!',
      body: {
        product: { categoryId, name, price, description },
      },
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.productId;
  const { rows } = await db.query(`select id from products where id = $1`, [
    id,
  ]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from products where id = $1', [id]);
    res.status(201).send({
      message: `Product was removed successfully!`,
    });
  } else {
    res.status(503).send({
      message: `Product added not exist!`,
    });
  }
  res.status(201).send();
};

exports.get10Products = async (req, res, next) => {
  const sql = `select count(*) from products;`;
  const { rows } = await db.query(sql);

  let perPage = 10;
  let page = req.params.page || 1;
  let offset = perPage * (page - 1);

  let totalPage = Math.ceil(rows[0].count / perPage);

  try {
    const sql = `SELECT * FROM products offset ${offset} limit ${perPage};`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show 10 products sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.countTotalProduct = async (req, res) => {
  try {
    const sql = `select count(*) from products;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show total of products list sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};
