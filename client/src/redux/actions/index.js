import axios from 'axios';
//const host = 'http://localhost:3001/'

// CONNECTING
/* FRONT-END & BACK-END */
/******************************************************/

//*1.0*[ ] GET ALL /recipes:
//* getting all recipes (API + DB)*//
const getAllRecipes= ()=>{
    return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes`);
     return dispatch ({
        type:'GET_ALL_RECIPES',
        payload: json.data

     });
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

// //*2*[ ] GET /recipes/{idReceta}:
// //* getting all recipes(API) by ID *
// const recipesById = (idReceta)=> {
//     return async (dispatch)=> {
//     let json = await axios.get(`http://localhost:3001/recipes/${idReceta}`);
//     return dispatch ({
//         type: 'GET_RECIPES_ID',
//         payload: json.data,
//     });
//   };
// };

// const cleanData = ()=> {
//     return (dispatch)=> {
//         return dispatch ({
//             type: 'CLEAN_DATA',
//             payload: {},
//         })
//     };
// };

// //*4.0*[ ] GET /diets:  
// //** ALL & TYPE by TYPE-DIET from DB
// const getTypesDiets = ()=> {
//     return async (dispatch)=>{
//         let json = await axios.get(`http://localhost:3001/diets`);
//         return dispatch ({
//             type: 'GET_ALL_TYPES',
//             payload: json.data,
//         });
//     };
// };


// //*4.1*[ ] GET /typediets/{nameTypeDiet}
// //**by nameTYPE from API:
// const dietsByNameType = (dieta)=> {
//     return async (dispatch)=> {
//         let json = await axios.get(`http://localhost:3001/typediets/${dieta}`);
//         return dispatch ({
//             type: 'GET_TYPES_NAME',
//             payload: json.data,
//         });
//     };
// }; 

// //*3*[ ] POST /recipes:
// const createRecipe = (payload)=> {
// //*payload as recipe*
//     return async ()=> {
//         let json = await axios.post(`http://localhost:3001/recipes`, payload)
//         return json;
//     };
// };

// //*DELETE /delete/:id
// const deleteRecipe = (id)=> { 
//    axios.delete(`http://localhost:3001/delete/${id}`)
//    return {
//         type: 'DELETE_RECIPE',
//         payload: id,
//    }
// };
// //esconder el delete para la presentacion xd



export {getAllRecipes,
   recipesByName,
}
    // recipesById,
    // cleanData,
    // getTypesDiets,
    // dietsByNameType,
    // createRecipe,
    // deleteRecipe

    