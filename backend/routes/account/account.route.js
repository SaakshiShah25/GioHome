const router = require('express').Router();

const User = require('../../models/signin/user.model.js');

var user

router.route('/:id').get((req, res)=>{
   
    user = req.params.id

    User.findOne({email:user},function (err, user){
        if (err) 
        {
            res.send(err);
        } 
        else 
        {
            res.json(user);
        }
    });

});

router.route('/updateAddress').post(
    (req,res)=>{
       
    
        User.findOneAndUpdate({email:user},{$push: {address: req.body.address}},function (error, success) {
                
            if (error) 
            {
                console.log(error);
            } 
            else 
            {
                console.log(success);
                res.send("Address updated")
            }

        })
    }
        );

router.route('/remove/:id').get((req, res)=>{

            var id = req.params.id;
            
            User.findOneAndUpdate({email:user},{$pull: {address: id}},function (error, success) {
               
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
        
module.exports = router;