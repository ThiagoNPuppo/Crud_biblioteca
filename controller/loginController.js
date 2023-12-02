const loginService = require('../service/loginService')

async function Login(req,res){
    const {email, senha} = req.body;
    try {
        const token = await loginService.Login(email, senha);
        res.status(200).json({token:token})
      }
      catch(err) {        
        res.status(err.id || 500).json({msg: err.message});
      }    
}


module.exports = { Login };