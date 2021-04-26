const express = require('express')
const controller = require('../controllers/summerEvenUsers.controller')
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

router.get('/:id', controller.getUser)

router.post('/upload', upload.single('file'), controller.upload)

module.exports = router
