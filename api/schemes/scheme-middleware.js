const Scheme= require('../schemes/scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const {scheme_id} = req.params;

  if(!scheme_id){
    res.status(404).json({message: `scheme with scheme_id ${scheme_id} not found`})
  }else{
    next()
  }

  // const schemes = await Scheme.find()
  // const data = await schemes.find(scheme => scheme.scheme_id === parseInt(scheme_id))
  // if(!data){
  //   res.status(404).json({message: `scheme with scheme_id ${scheme_id} not found`})
  // }else{
  //   next()
  // }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body;

  if(!scheme_name || scheme_name === '' || typeof scheme_name !== 'string') {
    res.status(400).json({message: 'invalid scheme_name'})
  }else{
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const steps = req.body

  if(!instructions || instructions === '' || instructions !== ''){
    res.status(400).json({message: 'invalid step'})
  }else if (steps === isNaN || steps <1) {
    res.status(400).json({message: 'invalid step'})
  }else {
    next()
  }
  // const { instructions, step_number} = req.body;

  // try{
  //   if(!instructions || instructions === "" || typeof instructions !== "string"){
  //     res.status(400).json({message: "invalid step"});
  //   }else if(!step_number || typeof step_number !== 'number' || step_number < 1) {
  //     res.status(400).json({message: "invaild step"})
  //   }else{
  //     next()
  //   }
  // }catch (err) {
  //   next(err)
  // }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
