const router = require('express-promise-router')();
const paymentController = require('../controllers/payment.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/payment', paymentController.getPayment);
router.post('/payment', verifyToken, paymentController.createPayment);
router.delete(
  '/payment/:paymentId',
  verifyToken,
  paymentController.deletePayment
);
router.post(
  '/payment/:paymentId',
  verifyToken,
  paymentController.updatePayment
);

module.exports = router;
