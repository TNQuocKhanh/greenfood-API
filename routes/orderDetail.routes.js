const router = require('express-promise-router')();
const orderDetailController = require('../controllers/orderDetail.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/orderDetail', orderDetailController.getOrderDetails);
router.post(
  '/orderDetail',
  verifyToken,
  orderDetailController.createOrderDetails
);
router.delete(
  '/orderDetail/:orderDetailId',
  verifyToken,
  orderDetailController.deleteOrderDetails
);
router.post(
  '/orderDetail/:orderDetailId',
  verifyToken,
  orderDetailController.updateOrderDetails
);

module.exports = router;
