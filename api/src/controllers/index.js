require ('dotenv').config();
const { YOUR_API_KEY } = process.env;
const { Recipe, Type } = require("../db");
const axios = require("axios");

//Llamado asincrono a la api:
//*API INFO
const getApi = async () => {
  //llamado a la api por axios:
  try {
    const all = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=10`
    ); //NO OLVIDAR CAMBIAR A 100
    const apikRecipes = all.data.results.map((re) => ({
      id: re.id,
      name: re.title,
      image: re.image,
      summary: re.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g,''),
      diets: re.diets,
      spoonacularScore: re.spoonacularScore,
      healthScore: re.healthScore,
      dishes: re.dishTypes,
      steps: re.analyzedInstructions[0]?.steps.map((st) => ({
        number: st.number,
        step: st.step,
      })),
    }));
    return apikRecipes;
  } catch (error) {
    console.log(error);
  }
};

//* DATA BASE INFO
const getDataBase = async () => {
  try{
    const db = await Recipe.findAll({
      include: {
        model: Type,
        attributes: ["nameType"],
        through: {
          attributes: [],
        },
      },
    });
    return db;
  }
  catch(error){
    console.log(error)
  }
};

//** DATA BASE BY DIETA:
const getDBdiet= async (dietdb)=>{
  let dbDiet= await getDataBase()
  dbDiet= dbDiet.filter(e=>{
    for(let i=0; i<e.types.length; i++){
      if(e.types[i]['nameType'].includes(dietdb)){
        return true
      }
    }
    return false;
  })
  return dbDiet;
};


//*ALL RECIPES BY ID
const getById = async (id)=> {
  // const allTypeId=id.match(/[a-z]/g)
  // if(allTypeId?.length){
  //   return false;
  // }
  try{
    const allId=await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
    );
    const idRecipes={
      id: allId.data.id,
      name: allId.data.title,
      image: allId.data.image,
      summary: allId.data.summary,
      diets: allId.data.diets,
      spoonacularScore: allId.data.spoonacularScore,
      healthScore: allId.data.healthScore,
      dishes: allId.data.dishTypes,
      steps: allId.data.analyzedInstructions[0]?.steps.map((st) => ({
        number: st.number,
        step: st.step,
      })),
    };
    return idRecipes;
  }
  catch(error){
    console.log (error)
  }
}; 


//* ALL RECIPES (FROM DB & API)
const getAllRecipes = async () => {
  try{
    const apiInfo = await getApi();
    const dbInfo = await getDataBase();
    let formaterDB;
    if (dbInfo.length>0){
      formaterDB= {
                  id : dbInfo[0].id,
                  name: dbInfo[0].name,
                  image:  dbInfo[0].image,
                  summary: dbInfo[0].summary,
                  healthScore: dbInfo[0].healthScore,
                  createdInDb : dbInfo[0].createdInDb,
                  diets: dbInfo[0].types.map(r => r.nameType),
                  steps: JSON.parse(dbInfo[0].steps)
      }
    }
    else {
      formaterDB=[];
    }
    //concatenando:
    const totalInfo = apiInfo.concat(formaterDB);
    return totalInfo;
    //return apiInfo
  }
  catch(error){
    console.log(error)
  }
};
//(*conPROMESAS):
// const getAllRecipes= async() => {
//     const [apikRecipes, data]=await Promise.all([getApi(),getDataBase()])
//     return [...apikRecipes, ...data] ;
// };

module.exports = {
  getApi,
  getDataBase,
  getDBdiet,
  getById,
  getAllRecipes,
};
