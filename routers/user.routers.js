const express = require('express')
const Users = require('../DB/models/users');
const multer = require('multer');
const router = new express.Router();

const upload = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
        return cb(new Error('This is not a correct format of the file'))
        cb(undefined,true)
    }
})

router.post('/uploads',upload.single('file'),async (req,res ,next) =>{
  let user = new Users({
      name : req.body.user_name,
      phone : req.body.user_phone,
      email : req.body.user_email,
      address : req.body.user_addr, 
      bill: req.file.buffer
    }
  )
  await user.save()
  res.redirect('/')
},(err,req,res,next) => res.status(404).send({error:err}))

router.get('/users/:id/',async (req,res,next) =>{
    try{
        const user = await Users.findById(req.params.id)
        if(!user || !user.bill)
        throw new Error()
        console.log("OKE")
        res.set('Content-Type','image/jpg')
        res.send(user.bill)
    }catch(e){
      res.status(404).send()
    }
    
})

module.exports = router
