const User = require('../models/users');
const config = require('../config/database');
var jwt = require('jsonwebtoken');
module.exports = (router) => {

router.post('/register', (req,res) => {
    
    
    if (!req.body.email) {
        res.json({ succes: false ,message: 'You must provide an e.mail!'});
    } else {
        if (!req.body.username) {
            res.json({ succes: false ,message: 'You must provide an username!'});
        } else {
            if(!req.body.password) {
                res.json({ succes: false ,message: 'You must provide an password!'});    
            } else {
                let user = new User({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username.toLowerCase(),
                    password: req.body.password
                });
                user.save((err) => {
                    
                    if(err) {
                        if(err.code === 11000){
                          res.json({succes: false, message:'Username or email already used!'});   
                        } else {
                            if(err.errors) {
                                if(err.errors.email) {
                                    res.json({succes: false, message: err.errors.email.message});
                                } else {
                                    if(err.errors.username){
                                        res.json({succes: false, message: err.errors.username.message});
                                    } else {
                                        if(err.errors.password) {
                                            res.json({succes: false, message: err.errors.password.message});
                                        } else {
                                            res.json({ succes: false, message: err});
                                        }
                                    }
                                }
                            }    
                            else {
                            res.json({succes: false, message:'Could not save user . Error: ', err});
                            }
                        }
                    } else {
                        res.json({succes: true, message: 'User saved!'});
                    }
                });
                
            }
            
        }
    }
});

router.get('/checkEmail/:email',(req,res) => {
    if(!req.params.email) {
        res.json({ success:false ,message:'E-mail was not provided'});
    } else {
        User.findOne({ email: req.params.email }, (err, user)=> {
            if(err){
                res.json({success: false, mesage:err})
            } else if (user) {
                res.json({ success:false , message:'E-mail is already taken'});
            } else {
                res.json({ succes:true, message: 'E-mail is aviable'});
            }
        });
    }
});

router.get('/checkUsername/:username',(req,res) => {
    if(!req.params.username) {
        res.json({ success:false ,message:'Username was not provided'});
    } else {
        User.findOne({ username: req.params.username }, (err, user)=> {
            if(err){
                res.json({success: false, mesage:err})
            } else if (user) {
                res.json({ success:false , message:'Username is already taken'});
            } else {
                res.json({ succes:true, message: 'Username is aviable'});
            }
        });
    }
});
router.post('/authenticate', function(req, res) {
      User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
          if (err) throw err;

          if (!user) {
              res.json({ success: false, message: 'Could not authenticate' });
          } else if (user) {
              if (req.body.password) {
                  var validPassword = user.comparePassword(req.body.password);
                  if (!validPassword) {
                      res.json({ success: false, message: 'Could not validate Password' });
                  } else {
                      res.json({ success: true, message: 'User Authenticate' });
                  }
              } else {
                  res.json({ success: false, message: 'No password provided' });
              }
          }
      });
  });
router.post('/login', (req, res) => {
    
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); 
    } else {
      
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); 
      } else {
        
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          
          if (err) {
            res.json({ success: false, message: err });
          } else {
            
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); 
            } else {
              const validPassword = user.comparePassword(req.body.password); 
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); 
              } else {
                const token = jwt.sign({userId: user._id},config.secret, {expiresIn: '24h'});
                res.json({succes: true, message: 'Succes', token:token, user:{username: user.username} });
              }
            }
          }
        });
      }
    }
  });

return router
}