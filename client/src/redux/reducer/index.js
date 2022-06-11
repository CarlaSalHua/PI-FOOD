
const initialState= {
    recipes: [],
    recipe: {},
    // diets: [],
    // post: {},
    // item: [],
    // currentPage: 0,
}

const rootReducer =(state= initialState, action)=>{
    switch(action.type){
        
        case 'GET_ALL_RECIPES':
            return{
                ...state,
                recipes: action.payload,
            }
        default:
            return state;
        
        /***********************************/
            case 'GET_RECIPES_NAME':
            return{
                ...state,
                recipes: action.payload,
            }
    }

   
    
};



export default rootReducer;