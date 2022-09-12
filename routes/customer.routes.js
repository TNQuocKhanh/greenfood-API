const router = require('express-promise-router')();
const customerController = require('../controllers/customer.controller');
const {
  register,
  changePassword,
  forgotPassword,
} = require('../controllers/register');
const { login } = require('../controllers/login');
const verifyToken = require('../middlewares/verifyToken');

router.get('/customers', verifyToken, customerController.getUser);
router.post('/customers', verifyToken, customerController.createUser);
router.post('/customers/:userId', verifyToken, customerController.updateUser);
router.delete('/customers/:userId', verifyToken, customerController.deleteUser);

router.post('/register', register);
router.post('/login', login);

router.post('/:userId/changePassword', changePassword);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
