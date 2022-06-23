const validationSearch =(input) =>{
    let advicesSearch= '';
    // const error= null;

    if(!input) {
        advicesSearch='Please search a recipe.';
    }
    else if(input.length<4 && input.length>0){
        advicesSearch='Please search a valid recipe.';
    }
    return advicesSearch;
};

export default validationSearch;