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
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    );
    const apikRecipes = all.data.results.map((re) => ({
      id: re.id,
      name: re.title,
      summary: re.summary,
      spoonacularScore: re.spoonacularScore,
      healthyScore: re.healthScore,
      dishes: re.dishTypes,
      steps: re.analyzedInstructions[0]?.steps.map((st) => ({
        num: st.number,
        step: st.step,
      })),
    }));
    return apikRecipes;
  } catch (error) {
    console.log("soy yos");
  }
};

//* DB INFO
const getDataBase = async () => {
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
};

//* ALL RECIPES
const getAllRecipes = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDataBase();
  //concatenando:
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;

};
//(*conPROMESAS):
// const getAllRecipes= async() => {
//     const [apikRecipes, data]=await Promise.all([getApi(),getDataBase()])
//     return [...apikRecipes, ...data] ;
// };

module.exports = {
  getApi,
  getDataBase,
  getAllRecipes,
};
