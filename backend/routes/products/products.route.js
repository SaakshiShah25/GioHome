const router = require('express').Router();
const Farmer = require('../../models/farmer/farmer.model.js');

router.route('/').get(
(req,res)=>{
    Farmer.find()
    .then(farmer=> res.json(farmer))
    .catch(err => res.status(400).json('Error: '+err))
});



router.route('/add').post(
    (req,res) => {
        
        const _id = req.body._id;
        const name = String(req.body.name);
        const location = String(req.body.location);
        const products = String(req.body.products);
       
        console.log(name)
        const newFarmer = new Farmer(
            {
            
            name,
            location,
            products,
           

            }
            
            );
            

        newFarmer.save()
        .then(()=>res.json('Farmer added!'))
        .catch(err=> res.status(400).json('Error: '+err));
    }
);
module.exports = router;