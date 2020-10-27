const router = require('express').Router();
const e = require('express');
const Cart = require('../../models/cart/cart.model.js');

router.route('/').get((req, res)=>{
    Cart.findOne({name:"Sanket"},'products',function (err, user){
        if (err) {
            res.send(err);
          } else {
            res.json(user.products);
          }
    });
});


router.route('/checkout').get((req, res)=>{
    Cart.findOne({name:"Sanket"},'products',function (err, user){
        if (err) {
            res.send(err);
          } else {
            res.json(user.products);
          }
    });
});


router.route('/edit').post((req, res)=>{
    var updateData = req.body;
    Cart.exists({products: updateData}, function(err, result) {
        if (err) {
          res.send(err);
        } 
        else 
        { 
            res.json(result)
            if (!result)
            {
            
            Cart.findOneAndUpdate({name:"Sanket"},{$push: {products: updateData}},function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
        }
        
        
        }
      })
});

router.route('/add').post(
    (req,res) => {
        
        const _id = req.body._id;
        const name = String(req.body.name);
        const products = String(req.body.products);
        console.log(name)
        const newCart = new Cart(
            {   name,
                products,
            }
            
            );
            

        newCart.save()
        .then(()=>res.json('Cart Created!'))
        .catch(err=> res.status(400).json('Error: '+err));
    }
);


router.route('/updatecart/:id').post((req, res) => {
    console.log(req.body)
    var updateData = req.body.available_quantity
    console.log(updateData)
    var id = req.params.id
    Cart.updateOne({"products.name":id},{$set:{"products.$.available_quantity":updateData}},function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
  });
    


router.route('/remove/:id').get((req, res)=>{
    var id = req.params.id;
    Cart.findOneAndUpdate({name:"Sanket"},{$pull: {products: {name:id}}},function (error, success) {
        console.log("Check")
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });

});

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//     });
// });

module.exports = router;