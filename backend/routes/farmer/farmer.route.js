const router = require('express').Router();
const FarmerUser = require('../../models/signin/farmeruser.model');

var farmer 
router.route('/update/:id').get((req, res)=>{
    farmer = req.params.id
        FarmerUser.findOne({email:farmer},'products',function (err, farmer){
                if (err) {
                    res.send(err);
                  } else {
                    res.json(farmer.products);
                  }
            });
    });
    

// router.route('/').get(
// (req,res)=>{
//     FarmerUser.find()
//     .then(farmer=> res.json("----",farmer))
//     .catch(err => res.status(400).json('Error: '+err))
// });

router.route('/add').post(
    (req,res) => {
        
        const _id = req.body._id;
        const name = String(req.body.name);
        const location = String(req.body.location);
        const products = (req.body.products);
        
        console.log(name)
       
        const newFarmer = new FarmerUser(
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


// Display the product named Orange and foreign key given to each product

router.route('/option/:id').get((req, res)=>{
    var name = req.params.id

    FarmerUser.find({"products.name" : name },function(error,object){
     
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
                                   product["farmer_email"] = farmer.email
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

    
    FarmerUser.find({ email : req.params.id},function(error,object){
     
                if(error)
                {
                    res.send(error)
                }
                else
                {
                    res.json(object)
                    console.log("Farmer!",object)
                }
                
            })
    
    
});









router.route('/edit/:id').post((req, res)=>{
    console.log(req.body);
    var updateData = req.body;
    console.log("Checking -> ",req.body.name)
    FarmerUser.exists({email :farmer, "products.name": req.body.name}, function(err, result)
    {
        console.log("Check Bool",result)
        if (!result)
        {
    FarmerUser.findOneAndUpdate({email:farmer},{$push: {products: updateData}},function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
        });
        
        }
        else
        {
            // res.send("Already in your list")
            // console.log("Already in my list")
            res.send(result)
        }
    })

});

router.route('/updateproduct/:id').post((req, res) => {
    console.log(req.body)
    var updateData = req.body
    var name = req.params.id
    console.log("Farmer",farmer)
    FarmerUser.updateOne({email:farmer,"products.name":name},{$set:{"products.$.price": updateData.price,"products.$.life":updateData.life}},function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('!!!!!',success);
        }
    });
  });


router.route('/deliver/:id').post((req,res)=>{
    const prod = req.body
    console.log("Hey",prod)
    const q = prod.available_quantity
    console.log(q)
    const id = req.params.id
    FarmerUser.findOneAndUpdate({email:id,"products.name":prod.name,"products.available_quantity":{$gte:q}},{$inc:{"products.$.available_quantity": - q}},function(error,success){
        if(error){
            res.send(error)
        }
        else{
            res.json(success)
            console.log(success)
        }
    })
})
// router.route('/updateproduct/:id').post((req, res) => {
//     console.log(req.body)
//     // var updateData = req.body
//     console.log("Farmer",farmer)
//     FarmerUser.findOne({email:farmer,"products.name":req.body.name},function(err,result){
//         console.log("result",result)
//         if(result){
//             result.products.map(u=>{
//                 var prod_name=u.name
//                 console.log("------",prod_name,req.body.name)
//                 FarmerUser.updateOne({prod_name:req.body.name},{$set:{products: req.body}},function (error, success) {
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         console.log('!!!!!',success);
//                     }
//                 });
//             })
            
//         }
//     })
   
//   });


   
// // This is only for Sanket right now 
// // the primart key for farmer has not been decided yet 

  router.route('/remove-product/:id').get((req, res)=>{

    var id = req.params.id;

    FarmerUser.findOneAndUpdate({email:farmer},{$pull: {products: {name:id}}},function (error, success) {
       
        if (error) 
        {
            console.log(error);
        } 
        else
        {
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