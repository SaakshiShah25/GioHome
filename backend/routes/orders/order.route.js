const router = require('express').Router();

const Order = require('../../models/orders/order.model.js');
const Cart = require('../../models/cart/cart.model.js');

router.route('/farmer').get(
    (req,res)=>{ 
        Order.find({"products.farmer_email":"abc@g.com"})
        .then(order=> res.json(order))
        .catch(err => res.status(400).json('Error: '+err))

});


    
router.route('/:id').get(
    (req,res)=>{
        const id = req.params.id
        Order.find({email:id})
        .then(order=> res.json(order))
        .catch(err => res.status(400).json('Error: '+err))

    });

router.route('/confirm').post(
    (req,res)=>{
       
        
        const address = String(req.body.address);
        const delivery = String(req.body.delivery);
        const net_amount = Number(req.body.net_amount);
        const payment = String(req.body.payment);
        // const delivery_date = Date.parse(req.body.delivery_date);
        const products = (req.body.products);
        const email = String(req.body.email);

        const order = new Order(
            {
                address,
                delivery,
                net_amount,
                payment,
                products,
                email
                // delivery_date
        })
       
        order.save()
        .then(()=>res.json('Order added!'),console.log("Success"))
        .then( 
           
            Cart.update({email:email},{"$pull":{"products":{}}},function(){
                console.log("All products cleared")
            })
            
        .catch(err=> res.status(400).json('Error: '+err)))
            });



// router.route('/farmer-order').get((req,res)=>{
//     var name="Apple"
//     // const farmer="5f3e41b85da66d33d6ebe0d7"
//     Order.find({"products.name":name},function(err,object){
//         if(err){
//             res.send(err)
//         }
//         else{
//             console.log("Heyyyy",object)
//             res.json(object)
//         }
//     })
// })



// router.route('/farmer').get((req, res)=>{
//     console.log("Hello!!!")
    
//     Order.find({ email : "s@gmail.com"},function(error,object){
     
//                 if(error)
//                 {
//                     res.send(error)
//                     console.log(error)
//                 }
//                 else
//                 {
//                     res.json(object)
//                     console.log("Heyyyy",object)
//                 }
                
//             })
//         });




module.exports = router;