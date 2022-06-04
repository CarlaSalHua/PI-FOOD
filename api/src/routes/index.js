const { Router } = require('express');
const Recipe = require('../models/Recipe');
const Type = require('../models/Type');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const router = Router();
const {YOUR_API_KEY} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Llamado asincrono a la api:
//*API INFO
const getApi= async ()=> {
//llamado a la api por axios:
const {data}=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
);
const apikRecipes= data.results.map(re=>({
    id:re.id,
    name:re.title,
    summary:re.summary,
    spoonacularScore: re.spoonacularScore,
    healthyScore: re.healthScore,
    dishes: re.dishTypes,
    steps:re.analyzedInstructions[0]?.steps.map(st=>({
            num: st.number,
            step: st.step,
        }))
   }))
  return apikRecipes;
};

//* DB INFO
const getDataBase= async ()=> {
    const db= await Recipe.findAll({
        include:{
            model: Type,
            attributes: ['name'],
        }
    });
    return db;
};

//* ALL RECIPES


//*1*[ ] GET /recipes?name="...":
// router.get('/recipes',async(req, res)=>{
//     const {name}=req.query;
//     if (!name) return res.json('No ingresaste el nombre de la receta.');
    
//     const {data}=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
//     );
//     const apikRecipes= data.results.map(re=>({
//         id:re.id,
//         name:re.title,
//         summary:re.summary,
//         spoonacularScore: re.spoonacularScore,
//         healthyScore: re.healthScore,
//         dishes: re.dishTypes,
//         steps:re.analyzedInstructions[0]?.steps.map(st=>({
//                 num: st.number,
//                 step: st.step,
//             }))
//        }))
//     console.log(apikRecipes)

//  const findRecipe = await Recipe.findAll()
//  const conCat = apiK.concat(findRecipe);
//  let search = conCat.filter(e=>e.name.includes(name))
//  res.json(search.length?search:'No se encontro la receta.')
// });

//get All/recipes
router.get ('/recipes', async (req, res)=>{
 const findAll= await Recipe.findAll()
    return res.json(findAll) 
});

//*2*[ ] GET /recipes/{idReceta}:
router.get('/recipes/:idReceta', async(req, res)=>{
 const {idReceta}= req.params;
 if(!idReceta) return res.json('No ingresaste ningun id');
 const {data} = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`);
 res.json(data);
});

//*3*[ ] POST /recipes:
//*4*[ ] GET /diets:


module.exports = router;
