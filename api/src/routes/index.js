require ('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
//import de CONTROLLERS:
const {getById,getAllRecipes} = require('../controllers/index');
const {getTypeDiet} = require('../controllers/TypeDiet');
const {Type, Recipe}= require ('../db')
//***************************************************************************************************************************//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//*1*[ ] GET /recipes?name="...":
router.get('/recipes', async(req, res)=>{
    const {name}=req.query;
    const totalRecipes= await getAllRecipes();
    // console.log(totalRecipes)
    try{
        if(name){
            let nameRecipe= totalRecipes.filter(re=>re.name.toLowerCase().includes(name.toLowerCase()));
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


// //*2*[ ] GET /recipes/{idReceta}:
router.get('/recipes/:idReceta', async(req, res)=>{
 const {idReceta}= req.params;
 const idTotalRecipes= await getById(idReceta);
 try{
     if(idReceta){
        idReceta?
        res.status(200).send(idTotalRecipes):
        res.status(404).send('No ingreso un id valido.')
     }
     else {
         res.status(404).send('No ingresaste ningun id');
     }
 }
 catch(error){
    res.status(404).send(error);
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
    try{
        //Elaboracion del bucle FOR para incluir mas de un tipo de dieta a la receta creada.
        for (let i=0; i<diets.length;i++){
         let promiseDiet= await Type.findOne({
             where: {nameType: diets[i].replaceAll(' ','-')}
         })
         await newRecipe.addType(promiseDiet);
        }
        res.status(200).send('Receta creada satisfactoriamente!')
    }
    catch(error){
    res.status(404).send(error);
    }
});

//*4*[ ] GET /diets:  
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

//**por TIPO DE DIETA DESDE LA BASE DE DATOS:
router.get('/diets', async(req, res)=>{
    const {nameType}=req.query;
    console.log('hola')
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

//*DELETE:
router.delete('/delete/:id', async(req, res)=>{
    const {id}= req.params;
    try{
        const deleteRecipe = await Recipe.destroy({
            where: {id: id}
        });
        
        if(id){
            deleteRecipe?
            res.status(200).send('La receta ha sido eliminada.'):
            res.status(404).send('El id no ha sido encontrado, o ya fue eliminado.')
        }
    }
    catch(error){
        res.status(404).send('Receta no encontrada.')
    }
    
}); 


module.exports = router;
