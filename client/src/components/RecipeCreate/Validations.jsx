const validationText= (input) =>{
    const advices={};
    
    if(input.name.length===0){
        advices.name='Please provide a recipe name.';
    }
    else if(input.name.length<=6){
        advices.name='The name must contain 6 letters at least.'
    }
    else if(!/^[A-Z].*[a-z]$/.test(input.name)){
        advices.name='The name must begin with a capital letter.'
    };

    if(input.summary.length===0){
        advices.summary='Please provide a summary about your recipe.'
    };

    if(input.healthScore===null){
        advices.healthScore='Please provide an score'
    };

    return advices;
};

const validationImage= (input) =>{
    let error= null;
    const inputImage= input.slice(0,8);

    if (inputImage !== 'https://'){
        error='Please use a URL with https path';
    }

    return error;
};

export {
    validationImage,
    validationText
}
