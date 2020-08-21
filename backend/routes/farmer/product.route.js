const router = require('express').Router();
let Product = require('../../models/farmer/product.model.js');

router.route('/').get(
(req,res)=>{
    Product.find()
    .then(product=> res.json(product))
    .catch(err => res.status(400).json('Error: '+err))
});



router.route('/add').post((req,res) => {
        const name = req.body.name;
        const description = req.body.description;
        const price = Number(req.body.price);
        const available_quantity = Number(req.body.available_quantity);
        const date_produced = Date.parse(req.body.date_produced);
        const life = Number(req.body.life);
        
        
        const newProduct = new Product({
            name,
            description,
            price,
            available_quantity,
            date_produced,
            life
        });
            

        newProduct.save()
        .then(()=>res.json('Product added!'))
        .catch(err=> res.status(400).json('Error: '+err));
});

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

router.route('/update/:name').post((req, res) => {
  Product.findById(req.params.name)
    .then(product => {
      product.name = req.body.name;
    //   check 
    });
});

module.exports = router;