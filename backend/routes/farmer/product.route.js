const router = require('express').Router();
const Product = require('../../models/farmer/product.model.js');

router.route('/').get(
(req,res)=>{
    console.log(req.params.name)
    Product.find()
    .then(product=> res.json(product))
    .catch(err => res.status(400).json('Error: '+err))
});



router.route('/add').post(
    (req,res) => {
        
        console.log(req.body)
        const name = String(req.body.name);
        const description = String(req.body.description);
        const price = Number(req.body.price);
        const available_quantity = Number(req.body.available_quantity);
        const date_produced = Date.parse(req.body.date_produced);
        const life = Number(req.body.life);
        
        console.log(name)
        const newProduct = new Product(
            {
            name,
            description,
            price,
            available_quantity,
            date_produced,
            life

            }
            
            );
            

        newProduct.save()
        .then(()=>res.json('Product added!'))
        .catch(err=> res.status(400).json('Error: '+err));
    }
);

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update').post((req, res) => {
//   Product.findOne({name:"tomato"})
//     .then(product => {
//     console.log(product)
//     product.name = "Apple"
//     product.save()
//     res.send({name : "Apple"});
//     })
    
// });

module.exports = router;