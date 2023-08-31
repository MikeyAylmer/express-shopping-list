const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');


// GET route for /items.
router.get('/', function (req, res) {
    res.json({ items })
})

// POST route for /items.
router.post('/', function (req, res) {
    const newItem1 = { "name": "popsicle", "price": 1.45 };
    const newItem2 = { "name": "cheetos", "price": 3.40 };
    items.push(newItem1);
    items.push(newItem2);
    res.status(201).json({ item: newItem1, newItem2 })
})

// GET route for item by specific name.
router.get('/:name', function (req, res) {
    const findItem = items.find(item => item.name == req.params.name)
    if (findItem == undefined) {
        throw new ExpressError("Item Not Found", 404)
    }
    res.json({ item: findItem })
})

// PATCH route for items.
router.patch('/:name', function (req, res) {
    const findItem = items.find(item => item.name === req.params.name);
    if (findItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    findItem.name = req.body.name
    res.json({ item: findItem })
})

// DELETE route
router.delete('/:name', function (req, res) {
    const findItemIndex = items.findIndex(item => item.name === req.params.name);
    if (findItemIndex === -1) {
        throw new ExpressError("Item not found", 404);
    }
    items.splice(findItemIndex, 1);
    res.json({ msg: "Deleted" });
});

// export router
module.exports = router;