const express = require('express');
const rateLimiter = require('express-rate-limit');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/db_config');
const ordersRouter = require('./routes/orders.route');
const { getHome } = require('./controllers/orders.controller');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
	limit: 100
}))
app.use(cors());
app.use(express.json());

app.get('/', getHome);

app.use('/api/v1/orders', ordersRouter);


app.use((req, res) => res.send('not found'));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`server listening on port ${PORT}`);
});
