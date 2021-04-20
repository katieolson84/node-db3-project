
const db = require('../../data/db-config');

// Find Get API Schemes - works!
const find= () => {
  return db("schemes as sc")
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc')
} 
  
// Find by Id
const findById = async (scheme_id) => { 
  const scheme = await db('schemes as sc')

  .select('sc.*')
  .where('sc.scheme_id', scheme_id)
  .count('st.step_id as number_of_steps')
  .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  .groupBy('sc.scheme_id')
  .orderBy('sc.scheme_id', "ASC")
  .first()

  if(scheme) {
    const steps = await db('schemes as sc')
    .select('sc.scheme_name', 'st.*')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'ASC');
    if (steps[0].step_id === null || !steps) {
      scheme.steps = [];
    }else {
      scheme.steps = steps
    }
  }
  return scheme;
  }


// Find Steps
const findSteps = (scheme_id) => { 
  return db('steps as st')
  .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
  .join('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
  .where('sc.scheme_id', scheme_id)
  .orderBy('st.step_number', 'ASC')

}

// Add a Scheme
const add = (scheme) => { 
  return db('schemes')
  .insert(scheme)
  .then(([scheme_id]) => {
    return db ('schemes')
    .where('scheme_id', scheme_id).first()
  })
}

// add a step to scheme
async function addStep(scheme_id, step) {
 
  return db('steps as st')
  .insert(step, scheme_id)
  .then(([scheme_id]) => findSteps(scheme_id))
  .then(()=> {
    return db('steps')
    .where('scheme_id', scheme_id)
  });
  
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
