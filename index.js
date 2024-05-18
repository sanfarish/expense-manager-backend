require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const dataRoute = require('./src/routes/data');
const authRoute = require('./src/routes/auth');
const { notFound } = require('./src/middlewares');

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (err) {
            res.status(400).json({
                message: `invalid JSON, ${err.message}`
            });
        };
    }
}));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use('/api/v1', authRoute);

app.use('/api/v1', dataRoute);

app.use('*', notFound);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log("Expense Manager API Server running on port", port));