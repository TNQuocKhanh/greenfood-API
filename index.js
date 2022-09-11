const express = require('express');
const app = express();
const cors = require('cors');

const port = 5000;

app.get('/', (req, res) => {
  res.send('RESTful API server started on: ' + port);
});

const index = require('./routes/index');
const productRoute = require('./routes/product.routes');
const categoryRoute = require('./routes/category.routes');
const customerRoute = require('./routes/customer.routes');
const paymentRoute = require('./routes/payment.routes');
const orderRoute = require('./routes/order.routes');
const orderDetailRoute = require('./routes/orderDetail.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', productRoute);
app.use('/api/', categoryRoute);
app.use('/api/', customerRoute);
app.use('/api/', paymentRoute);
app.use('/api/', orderRoute);
app.use('/api/', orderDetailRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
