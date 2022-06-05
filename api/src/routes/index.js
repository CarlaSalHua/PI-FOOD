const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//import de controllers
const {getAllRecipes } = require('../controllers');

//*****************************************************//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//*1*[ ] GET /recipes?name="...":
router.get('/recipes', async(req, res)=>{
    const {name}=req.query;
    const totalRecipes= await getAllRecipes();
    console.log(totalRecipes)
    if(name){
        let nameRecipe= totalRecipes.filter(re=>re.name.toLowerCase().includes(name.toLowerCase()));
        nameRecipe.length?
        res.status(200).send(nameRecipe):
        res.status(404).send('No ingresaste el nombre correcto de la receta.');
    }
    else{
        res.status(200).send(totalRecipes)
    }

    // if (!name) return res.json('No ingresaste el nombre de la receta.');
    
    // const {data}=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    // );
    // const apikRecipes= data.results.map(re=>({
    //     id:re.id,
    //     name:re.title,
    //     summary:re.summary,
    //     spoonacularScore: re.spoonacularScore,
    //     healthyScore: re.healthScore,
    //     dishes: re.dishTypes,
    //     steps:re.analyzedInstructions[0]?.steps.map(st=>({
    //             num: st.number,
    //             step: st.step,
    //         }))
    //    }))
    // console.log(apikRecipes)

//  const findRecipe = await Recipe.findAll()
//  const conCat = apiK.concat(findRecipe);
//  let search = conCat.filter(e=>e.name.includes(name))
//  res.json(search.length?search:'No se encontro la receta.')
});

//get All/recipes
// router.get ('/recipes', async (req, res)=>{
//  const findAll= await Recipe.findAll()
//     return res.json(findAll) 
// });

// //*2*[ ] GET /recipes/{idReceta}:
// router.get('/recipes/:idReceta', async(req, res)=>{
//  const {idReceta}= req.params;
//  if(!idReceta) return res.json('No ingresaste ningun id');
//  const {data} = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`);
//  res.json(data);
// });

//*3*[ ] POST /recipes:
//*4*[ ] GET /diets:


module.exports = router;
