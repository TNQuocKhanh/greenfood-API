const db = require('../config/database');

exports.getCategory = async (req, res) => {
  try {
    const sql = `SELECT * FROM category;`;
    const { rows } = await db.query(sql);
    res.status(201).send({
      message: 'Show list of category sucessfully',
      body: { rows },
    });
  } catch (error) {
    console.log('Error', error);
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const sql = `INSERT INTO category(name) VALUES ('${name}')`;
  const { rows } = await db.query(sql);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Category added successfully!',
      body: {
        product: { name },
      },
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const id = req.params.categoryId;
  const sqlupdate = `UPDATE category SET name = '${name}' WHERE id = ${id}`;
  const { rows } = await db.query(sqlupdate);
  if (rows === null) {
    res.status(500).send({
      message: 'Please enter infomation...',
    });
  } else {
    res.status(200).send({
      message: 'Category updated successfully!',
      body: {
        product: { name },
      },
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.categoryId;
  const { rows } = await db.query(`SELECT id FROM category WHERE id = $1`, [
    id,
  ]);
  if (rows.length > 0 && rows[0]) {
    await db.query('DELETE from category where id = $1', [id]);
    res.status(201).send({
      message: `Category was removed successfully!`,
    });
  } else {
    res.status(503).send({
      message: `Category not exist!`,
    });
  }
  res.status(201).send();
};
