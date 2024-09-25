require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const dataRoute = require('./src/routes/data');
const authRoute = require('./src/routes/auth');
// const adminRoute = require('./src/routes/admin');
const notFound = require('./src/middlewares/notFound');

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

app.get('/', (req, res) => {
    res.status(301).redirect('/api/v1/docs');
});

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

// app.use('/api/v1', adminRoute);

app.use('/api/v1', authRoute);

app.use('/api/v1', dataRoute);

app.use('*', notFound);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Expense Manager API Server running on port", port));