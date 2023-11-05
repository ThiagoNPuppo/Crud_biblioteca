const loginService = require('../service/loginService')

function Login(req,res){
    const login = req.body;

    try {
        const token = loginService.Login(login);
        res.status(201).json({token:token})
      }
      catch(err) {        
        res.status(err.id).json({msg: err.message});
      }    
}

module.exports = { Login };