const SummerEventUser = require('../DB/models/summerEventUsers');

module.exports.upload = async function(req, res ,next) {
  try{
    let summerEventUser = new SummerEventUser({
      name : req.body.user_name,
      phone : req.body.user_phone,
      email : req.body.user_email,
      address : req.body.user_addr, 
      bill: req.file.buffer
    }
  )
  await summerEventUser.save()
  res.redirect('/')
  }catch(e){
    res.status(404).send()
  }

}

module.exports.getUser = async function(req,res,next){
  try{
    const summerEventUser = await SummerEventUser.findById(req.params.id)
    if(!summerEventUser || !summerEventUser.bill)
    throw new Error()
    res.set('Content-Type','image/jpg')
    res.send(summerEventUser.bill)
  }catch(e){
    res.status(404).send()
  }
}
