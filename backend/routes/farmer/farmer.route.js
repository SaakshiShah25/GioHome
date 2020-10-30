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
        const products = (req.body.products);
        
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

// router.route('/option').get((req, res)=>{
//     Farmer.find({},function(error,succ){
//         if(error)
//         {
//             res.send(error)
//         }
//         else{
//             res.json(succ)
//         }
//     })
    
// });



// Display the product named Orange and foreign key given to each product

router.route('/option/:id').get((req, res)=>{
    var name = req.params.id

    Farmer.find({"products.name" : name },function(error,object){
     
                if(error)
                {
                    res.send(error)
                }
                else{
                    var temp =[]
                    object.map(
                        farmer => farmer.products.map(
                            product => {
                                if(product.name == name)
                                {
                                   product["farmer_id"] = farmer._id
                                   temp.push(product)
                                    
                                }
                            }
                        )
                    )
                    res.json(temp)
                }
            })
    
    
});

// Returns all the details of the farmer of the give id

router.route('/farmer-details/:id').get((req, res)=>{

    var id = req.params.id
    Farmer.find({ _id : id},function(error,object){
     
                if(error)
                {
                    res.send(error)
                }
                else
                {
                    res.json(object)
                }
                
            })
    
    
});



router.route('/update').get((req, res)=>{

        Farmer.findOne({name:"Sanket"},'products',function (err, farmer){
            if (err) {
                res.send(err);
              } else {
                res.json(farmer.products);
              }
        });
});




router.route('/edit/').post((req, res)=>{
    
    console.log(req.body);
    var updateData = req.body;
    Farmer.findOneAndUpdate({name:"Sanket"},{$push: {products: updateData}},function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });

});

router.route('/updateproduct/:id').post((req, res) => {
    console.log(req.body)
    var updateData = req.body
    var id = req.params.id
    Farmer.findOneAndUpdate({name:"Sanket"},{$set:{products: updateData}},{new:true},function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
  });
// router.route('/updateprod/:id').post((req, res) => {
//     Farmer.findById(req.params.id)
//       .then(products => {
//         products.price = Number(req.body.price);
//         products.life = Number(req.body.life);

//         products.save()
//         .then(() => res.json('Product updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//         })

//         .catch(err => res.status(400).json('Error: ' + err));
//   });

 
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