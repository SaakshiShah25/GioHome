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
        const products = Array(req.body.products);
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


router.route('/update').get((req, res) => {
    Farmer.findOne({name:"Sanket"},'products',function (err, farmer){
        if (err) return handleError(err);
        console.log(farmer.products);
    });
})
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