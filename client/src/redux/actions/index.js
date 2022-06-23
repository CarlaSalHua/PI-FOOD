import axios from 'axios';
//const host = 'http://localhost:3001/'

// CONNECTING
/* FRONT-END & BACK-END */
/******************************************************/

//*1.0*[ ] GET ALL /recipes:
//* getting all recipes (API + DB)*//
const getAllRecipes= ()=>{
    return async function (dispatch) {
      try{
        var json = await axios.get(`http://localhost:3001/recipes`);
         return dispatch ({
            type:'GET_ALL_RECIPES',
            payload: json.data
    
         });
      }
      catch(error){
        throw error;
      }
   };
};

//*1.1*[ ] GET /recipes?name="...":
//* getting all recipes(API+DB) by NAME *
const recipesByName = (name)=>{ 
    return async (dispatch)=> {
    let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch ({
        type: 'GET_RECIPES_NAME',
        payload: json.data,
    });
  };
};

//*2*[ ] GET /recipes/{idReceta}:
//* getting all recipes(API) by ID *
const recipesById = (idRecipe)=> {
    return async (dispatch)=> {
    let json = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
    return dispatch ({
        type: 'GET_RECIPES_ID',
        payload: json.data,
    });
  };
};

// const cleanData = ()=> {
//     return (dispatch)=> {
//         return dispatch ({
//             type: 'CLEAN_DATA',
//             payload: {},
//         })
//     };
// };

//*4.0*[ ] GET /diets:  
//** ALL & TYPE by TYPE-DIET from DB
const getTypesDiets = (payload)=> {
  
  return ({
            type: 'GET_ALL_TYPES',
            payload: payload,
        });
};


//*4.1*[ ] GET /typediets/{nameTypeDiet}
//**by nameTYPE from API:
const dietsByNameType = (dieta)=> {
    return async (dispatch)=> {
        let json = await axios.get(`http://localhost:3001/typediets/${dieta}`);
        return dispatch ({
            type: 'GET_TYPES_NAME',
            payload: json.data,
        });
    };
}; 

//*3*[ ] POST /recipes:
const createRecipe = (payload)=> {
//*payload as recipe*
    return async function (dispatch){
      console.log('hellooooooo')
      let json = await axios.post(`http://localhost:3001/createRecipe`, payload)
      console.log('hellooooooo',json)
      return json;
    };
  };
  
  //*DELETE /delete/:id
  const deleteRecipe = (id)=> { 
    axios.delete(`http://localhost:3001/delete/${id}`)
    return {
      type: 'DELETE_RECIPE',
      payload: id,
    }
  };
  // //esconder el delete para la presentacion xd
  

//*ASCENDANT FILTER (A-Z) \ DEFAULT:(Z-A)*
const filterA_Z= (payload)=> {
    return {
      type: 'FILTER_A_Z',
      payload,
    };
};

//*Diet Types filter* (NO FUNCIONO TT___TT)...REVISAR
const filter_diet_types= (payload)=> {
    return{
      type: 'FILTER_DIET_TIPES',
      payload,
    };
};

//*HEALTH SCORE FILTER (MIN-MAX) \ DEFAULT:(MAX-MIN)*
const filter_health_score= (payload)=> {
    return{
      type: 'FILTER_HEALTH_SCORE',
      payload,
    };
};

//*CREATED FILTER (IN DATA BASE) \ DEFAULT:(IN API)*
const filter_created= (payload)=>{
    return{
      type: 'FILTER_BY_CREATED',
      payload,
    };
};



export {
   getAllRecipes,
   recipesByName,
   recipesById,
   createRecipe,
   dietsByNameType,
   filterA_Z,
   filter_diet_types,
   filter_health_score,
   filter_created,
   getTypesDiets,
   deleteRecipe,
}
    // recipesById,
    // cleanData,

    