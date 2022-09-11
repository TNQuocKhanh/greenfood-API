const router = require('express-promise-router')();
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/category', categoryController.getCategory);
router.post('/category', verifyToken, categoryController.createCategory);
router.delete(
  '/category/:categoryId',
  verifyToken,
  categoryController.deleteCategory
);
router.post(
  '/category/:categoryId',
  verifyToken,
  categoryController.updateCategory
);

module.exports = router;
