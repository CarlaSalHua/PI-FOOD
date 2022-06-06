require ('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//import de controllers
const {getById,getAllRecipes} = require('../controllers/index');
const {getTypeDiet} = require('../controllers/TypeDiet');
//const Type = require('../models/Type');
const {Type, Recipe}= require ('../db')
//*****************************************************//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//*1*[ ] GET /recipes?name="...":
router.get('/recipes', async(req, res)=>{
    const {name}=req.query;
    const totalRecipes= await getAllRecipes();
    // console.log(totalRecipes)
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
    // const {data}=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=10`
    // );0
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


// //*2*[ ] GET /recipes/{idReceta}:
router.get('/recipes/:idReceta', async(req, res)=>{
 const {idReceta}= req.params;
 const idTotalRecipes= await getById(idReceta);
 if(idReceta){
    idReceta?
    res.status(200).send(idTotalRecipes):
    res.status(404).send('No ingreso un id valido.')
 }
 else {
     res.status(404).send('No ingresaste ningun id');
 }
});

//*3*[ ] POST /recipes:
router.post('/recipe', async(req, res)=>{
    const {name, image, summary,  healthScore, steps, diets}= req.body;

    const newRecipe= await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
    });

    for (let i=0; i<diets.length;i++){
        let promiseDiet= await Type.findOne({
         where: {nameType: diets[i].replaceAll(' ','-')}
        })
        await newRecipe.addType(promiseDiet);
    }

    res.status(200).send('Receta creada')
});

router.get('/typediets/:dieta', async(req, res)=>{
    const {dieta}= req.params;
    const dietsApi= await getTypeDiet(dieta);

    if(dieta){
        dietsApi.length?
        res.status(200).send(dietsApi):
        res.status(404).send('Dieta no encontrada')
    }
    else{
        res.status(404).send('No ingreso ninguna dieta.')
    }
    //console.log(dietsApi);
});


//*4*[ ] GET /diets:
router.get('/diets/:nameType', async(req, res)=>{
    const {nameType}=req.params;
    const typeDiet= await Type.findAll();
    // //console.log(typeDiet)
    //const diets= await getTypeDiet()
    if(nameType){
        const dietName= typeDiet.filter(e=>e.nameType.toLowerCase().includes(nameType.toLocaleLowerCase()));
        dietName.length?
        res.status(200).send(dietName):
        res.status(404).send('Dieta no encontrada')
    }
    else{
        res.status(200).send(typeDiet);
    }
    
});



module.exports = router;
