const router = require('express').Router();
const FarmerUser = require('../../models/signin/farmeruser.model');
const FarmerUserSession = require('../../models/signin/farmerusersession.model');
//module.exports = (app) => {
  /*
   * Sign up
   */
  
  router.route('/api/account/farmersignup').post( (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
        password
    } = body;
    let {
      email
    } = body;
    if (!firstName) {
       return res.send({
         success: false,
         message: 'Error: First Name cannot be blank.'
       });
     }
    if (!lastName) {
       return res.send({
         success: false,
         message: 'Error: Last Name cannot be blank.'
       });
     }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    FarmerUser.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new FarmerUser();
      newUser.email = email;
      newUser.firstName=firstName;
      newUser.lastName=lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  }); // end of sign up endpoint


router.route('/api/account/farmersignin').post( (req, res, next) => {
   const { body } = req;
   const {
     password
   } = body;
   let {
     email
   } = body;
   if (!email) {
     return res.send({
       success: false,
       message: 'Error: Email cannot be blank.'
     });
   }
   if (!password) {
     return res.send({
       success: false,
       message: 'Error: Password cannot be blank.'
     });
   }
   email = email.toLowerCase();
   email = email.trim();
   FarmerUser.find({
     email: email
   }, (err, users) => {
     if (err) {
       console.log('err 2:', err);
       return res.send({
         success: false,
         message: 'Error: server error'
       });
     }
     if (users.length != 1) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     }
     const user = users[0];
     if (!user.validPassword(password)) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     }
     // Otherwise correct user
     const userSession = new FarmerUserSession();
     userSession.userId = user._id;
     userSession.save((err, doc) => {
       if (err) {
         console.log(err);
         return res.send({
           success: false,
           message: 'Error: server error'
         });
       }
       return res.send({
         success: true,
         message: 'Valid sign in',
         token: doc._id
       });
     });
   });
 });

 router.route('/api/account/farmerverify').get( (req, res, next) => {
   // Get the token
   const { query } = req;
   const { token } = query;
   // ?token=test

   // Verify the token is one of a kind and it's not deleted.

   FarmerUserSession.find({
     _id: token,
     isDeleted: false
   }, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }

     if (sessions.length != 1) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     } else {
       return res.send({
         success: true,
         message: 'Good'
       });
     }
   });
 });

 router.route('/api/account/farmerlogout').get( (req, res, next) => {
   // Get the token
   const { query } = req;
   const { token } = query;
   // ?token=test

   // Verify the token is one of a kind and it's not deleted.

   FarmerUserSession.findOneAndUpdate({
     _id: token,
     isDeleted: false
   }, {
     $set: {
       isDeleted:true
     }
   }, null, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }

     return res.send({
       success: true,
       message: 'Good'
     });
   });
 });
//};
module.exports=router;

 