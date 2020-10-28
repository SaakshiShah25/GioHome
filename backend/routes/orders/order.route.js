const router = require('express').Router();
const Order = require('../../models/orders/order.model.js');

router.route('/').get(
    (req,res)=>{
        console.log(req.params.name)
        Order.find()
        .then(order=> res.json(order))
        .catch(err => res.status(400).json('Error: '+err))
    });

module.exports = router;