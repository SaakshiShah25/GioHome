const router = require('express').Router();
const Order = require('../../models/orders/order.model.js');
const Cart = require('../../models/cart/cart.model.js');
router.route('/').get(
    (req,res)=>{
        console.log(req.params.name)
        Order.find()
        .then(order=> res.json(order))
        .catch(err => res.status(400).json('Error: '+err))
    });

router.route('/confirm').post(
    (req,res)=>{
       
        console.log(req.body)
        const address = String(req.body.address);
        const delivery = String(req.body.delivery);
        const net_amount = Number(req.body.net_amount);
        const payment = String(req.body.payment);
        // const delivery_date = Date.parse(req.body.delivery_date);
        const products =(req.body.products);
        const order = new Order(
            {
                address,
                delivery,
                net_amount,
                payment,
                products,
                // delivery_date
        })
       
        order.save()
        .then(()=>res.json('Order added!'),console.log("Success"))
        .then( 
           
            Cart.update({name:"Sanket"},{"$pull":{"products":{}}},function(){
                console.log("All products cleared")
            })
            
        .catch(err=> res.status(400).json('Error: '+err)))
        
        

    
                });
        
   

module.exports = router;