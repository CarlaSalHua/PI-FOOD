require ('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
const {getDBdiet} = require('../controllers/index')

//*GET ALL RECIPES PER DIETS FROM API WITH PARAMETHER
const getTypeDiet = async (dieta) => {
    const allDiet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
 try{
        const apikTypes= await allDiet.data.results.filter(t=>t.diets.includes(dieta));
        const dietsbd= await getDBdiet(dieta.replaceAll(' ','-'))
        
        let total= apikTypes.concat(dietsbd);
            //const dietName= typeDiet.filter(e=>e.nameType.toLowerCase().includes(nameType.toLocaleLowerCase()));
        console.log(dieta)
        return total;
 }
 catch(error){
    console.log(error);
 }
};

module.exports={
    getTypeDiet,
};