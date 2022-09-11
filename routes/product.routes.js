const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.delete('/products/:productId', productController.deleteProduct);
router.post('/products/:productId', productController.updateProduct);

router.get('/products/pages/:page', productController.get10Products);
router.get('/products/count', productController.countTotalProduct);

module.exports = router;
