require ('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//import de CONTROLLERS:
const {getById,getAllRecipes, getDataBase} = require('../controllers/index');
const {getTypeDiet} = require('../controllers/TypeDiet');
const {Type, Recipe}= require ('../db')
//***************************************************************************************************************************//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//*1*[ ] GET /recipes?name="...":
//* getting ALL recipes(API+DB) by NAME *
router.get('/recipes', async(req, res)=>{
    const {name}=req.query;
    const totalRecipes= await getAllRecipes();
    // console.log(totalRecipes)
    try{
        if(name){
            let nameRecipe= totalRecipes.filter((re)=>re.name.toLowerCase().includes(name.toLowerCase()));
            nameRecipe.length?
            res.status(200).send(nameRecipe):
            res.status(404).send('No ingresaste el nombre correcto de la receta.');
        }
        else{
            res.status(200).send(totalRecipes)
        }
    }
    catch(error){
        res.status(404).send(error);
    }

});


//*2*[ ] GET /recipes/{idReceta}:
//* getting all recipes(API) by ID * 
// NOTA: ADICIONAR LOS DE LA BASE DE DATOS
router.get('/recipes/:idRecipe', async(req, res)=>{
 const {idRecipe}= req.params;
 
 try{
 const idTotalRecipes= await getById(idRecipe);
 //console.log('ooooooooooooooooo', idTotalRecipes)
 let recipesDataBase= await getDataBase();
 
 
 //console.log('heloooooooooooooooooo', recipesDataBase)

 const matchRecipes = await recipesDataBase.filter((r)=>r.id===idRecipe);

//console.log ('hola2', matchRecipes) 
     
if(idRecipe){
        if(matchRecipes.length>0){
            return res.status(200).send({
                id : matchRecipes[0].id,
                name: matchRecipes[0].name,
                image:  matchRecipes[0].image,
                summary: matchRecipes[0].summary,
                healthScore: matchRecipes[0].healthScore,
                createdInDb : matchRecipes[0].createdInDb,
                diets: matchRecipes[0].types.map(r => r.nameType),
                steps: JSON.parse(matchRecipes[0].steps)
              })
        }
        //console.log(idTotalRecipes)
        res.status(200).send(idTotalRecipes)
     }
     else {
         res.status(404).send('No ingresaste ningun id');
     }
 }
 catch(error){
    res.status(404).send(error);
 }
});

//*3*[ ] POST /recipe:
router.post('/createRecipe', async(req, res)=>{
    const {name, image, summary, healthScore, steps, diets}= req.body;
//console.log ('consoles', req.body)
    const newRecipe= await Recipe.create({
        name,
        summary,
        image,
        healthScore,
        diets,
        steps,
    });
    try{
        //Elaboracion del bucle FOR para incluir mas de un tipo de dieta a la receta creada.
        for (let i=0; i<diets.length;i++){
         let promiseDiet= await Type.findOne({
             where: {
                nameType: diets[i]
            }
         })
         console.log(`Dieta ${i}`,promiseDiet)
         await newRecipe.addType(promiseDiet);
        }
        res.status(200).send('Receta creada satisfactoriamente!')
    }
    catch(error){
    res.status(404).send(error);
    }
});

//*4*[ ] GET /typediets/{nameTypeDiet}  
//**por TIPO DE DIETA DESDE API:
router.get('/typediets/:dieta', async(req, res)=>{
    const {dieta}= req.params; // probar con query
try{
    if(dieta){
         const dietsApi= await getTypeDiet(dieta.toLowerCase());
         dietsApi.length?
         res.status(200).send(dietsApi):
         res.status(404).send('Dieta no encontrada')
     }
     else{
         res.status(200).send('No ingreso ninguna dieta.');
         //res.status(200).send(diets)
     }
 }
 catch(error){
    res.status(404).send(error);
 }
});

//**ALL & TYPE by TYPE-DIET from DB:
router.get('/diets', async(req, res)=>{
    const {nameType}=req.query;
    //console.log('hola')
    //console.log(Type.findAll)
    //const typesDiet= await getTypeDiet(); 
    try{
      const typeDiet= await Type.findAll();
      if(nameType){
          const dietName= typeDiet.filter(e=>e.nameType.toLowerCase().includes(nameType.toLocaleLowerCase()));
          dietName.length?
          res.status(200).send(dietName):
          res.status(404).send('Dieta no encontrada')
      }
      else{
          res.status(200).send(typeDiet)
    }
}
catch(error){
    res.status.send(error);
  }  
});

//*DELETE /delete/:id
router.delete('/delete/:id', async(req, res)=>{
    const {id}= req.params;
    try{
        const deleteRecipe = await Recipe.destroy({
            where: {id: id}
        });
        
        if(id){
            deleteRecipe ?
            res.status(200).send('La receta ha sido eliminada.'):
            res.status(404).send('El id no ha sido encontrado, o ya fue eliminado.')
        }
    }
    catch(error){
        res.status(404).send('Receta no encontrada.')
    }
    
}); 

module.exports = router;
