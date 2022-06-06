require ('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
const {Type}= require('../db');

const getTypeDiet = async (dieta) => {
    try{
        const allDiet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);

        const apikTypes= await allDiet.data.results.filter(t=>t.diets.includes(dieta));
        //const typeDiets = [...new Set(apikTypes),'vegetarian'];
        //console.log(typeDiets)
        //console.log(apikTypes)
        // apikTypes.forEach(async(i)=>{
        //     await Type.findOrCreate({
        //         where:{ nameType: i}
        //     });
        // })
        // const allTypeDiets= await Type.findAll();
        // return allTypeDiets;
        return apikTypes;
    }
    catch(error){
        console.log(error);
    }
};
console.log()

module.exports={
    getTypeDiet,
};