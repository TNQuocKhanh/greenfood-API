const router = require('express-promise-router')();
const orderController = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/order', orderController.getOrder);
router.post('/order', verifyToken, orderController.createOrder);
router.delete('/order/:orderId', verifyToken, orderController.deleteOrder);
router.post('/order/:orderId', verifyToken, orderController.updateOrder);

module.exports = router;
