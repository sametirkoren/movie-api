const jwt  = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    // datayı aldık diyelim
    // böyle bir token var mı yok mu onu kontrol edelim şimdi.

    if(token){
        // token varsa verify etmem gerekiyor . 
        jwt.verify(token , req.app.get('api_secret_key') , (err,decoded) =>{
            if(err){
                // Token geçersiz ise bu mesajı vericez.
                res.json({
                    status : false , 
                    message : 'Failed to authenticate token.'
                })
            }else{
                // Herşey yolunda artık herhangi bir route ile eşleşebilirsin anlamına geliyor.
                req.decode =decoded;
                next();
            }
        });
    }else{
        res.json({
            status : false , 
            message : 'No token provied.'
        })
    }
};

// localhost:3000/api/movies?token=asdhasdhas -> bunu query ile yakalarım.
