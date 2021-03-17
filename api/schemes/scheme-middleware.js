const Scheme= require('../schemes/scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const scheme= await Scheme.findById(req.params.id)
    if(!scheme) {
      res.status(404).json({messgae: `scheme with ${scheme_id} not found`})
    }else{
      req.scheme = scheme
      next()
    }
  }catch (err) {
    next(err)
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
 
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
  try{
    if(!req.body.instructions){
      res.status(400).json({message: 'invalid step'})
    }else if( typeof req.body.instructions !== "string"){
      res.status(400).json({message: 'invalid step'})
    }else if(req.body.step_number < 1){
      res.status(400).json({message: 'invalid step'})
    }else{
      next()
    }
  }catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
