const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

// define post routes

router.get('/', function (req, res) {
    res.json({ items })
})

router.post('/', function (req, res) {
    const newItem = [
        { "name": "popsicle", "price": 1.45 },
        { "name": "cheetos", "price": 3.40 }]
    items.push(newItem)
    res.status(201).json({ item: newItem })
})

module.exports = router;