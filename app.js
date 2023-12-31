const express = require('express');
const itemRoutes = require('./itemListRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use('/items', itemRoutes)


app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.msg,
    });
});

module.exports = app;