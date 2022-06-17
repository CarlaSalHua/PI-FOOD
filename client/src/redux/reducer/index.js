
const initialState= {
    recipes: [],
    allRecipes: [],
    xrecipe:[],
    error: {},
    recipeDetail:{},
    diets: [],
    //post: {},
    // currentPage: 0,
}

const rootReducer =(state= initialState, action)=>{
    switch(action.type){
        
        case 'GET_ALL_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                xrecipe: action.payload,
                allRecipes: action.payload,
                //diets: action.payload,
                error:{},
            }
        default:
            return state;
        
        /***********************************/

        case 'GET_ALL_TYPES':
            const typeDiets=[];
            state.allRecipes.forEach((e)=>{
                e.diets.forEach((t)=>{
                    if(t===action.payload){
                        typeDiets.push(e)
                    }
                })
            });
            console.log('hola diets',typeDiets)
            return{
                ...state,
                recipes:action.payload==='all'?state.allRecipes:typeDiets,
                diets: action.payload,
            }


        /***********************************/
            case 'GET_RECIPES_NAME':
                return{
                    ...state,
                    recipes: action.payload,
                }

        /***********************************/
            case 'GET_RECIPES_ID':
                return{
                    ...state,
                    recipeDetail: action.payload,
                }

        /***********************************/

            case 'GET_TYPES_NAME':
                return{
                    ...state,
                    diets: action.payload
                }

        /***********************************/

            case 'FILTER_A_Z':
            const order= action.payload==='a-z'?
             state.recipes.sort((a,b)=>{
                 return a.name.localeCompare(b.name);
             }) : 
             state.recipes.sort((a,b)=>{
                 return b.name.localeCompare(a.name)
            });

            return{
                ...state,
                recipes: [...order],
            };
        
        /***********************************/

            case 'FILTER_DIET_TIPES':
            const allTypes=state.xrecipe;

            const all= action.payload==='all'?
             allTypes :
             allTypes.filter((e)=>e.diets?.includes(action.payload));

            return{
                ...state,
                recipe: all,
            }

        /***********************************/
            
            case 'FILTER_HEALTH_SCORE':
            const scoreFilter= state.recipes? 
            state.recipes : state.recipes;

            const orderByHealthScore=
            action.payload==='min-max'?
            scoreFilter.sort((a,b)=>{
                if(a.healthScore<b.healthScore){
                    return -1;
                }
                if(b.healthScore<a.healthScore){
                    return 1;
                }
                return 0;
            }) : 
            scoreFilter.sort((a,b)=>{
                if(a.healthScore<b.healthScore){
                    return 1;
                }
                if(b.healthScore<a.healthScore){
                    return -1;
                }
                return 0;
            })

            return {
                ...state,
                recipes:[...orderByHealthScore]
            }

        /***********************************/

        case 'FILTER_BY_CREATED':
        var createdFilter=
        action.payload==='created' ?
        state.allRecipes?.filter((e)=>e.createdInDb):
        state.allRecipes?.filter((e)=>!e.createdInDb);

        if(action.payload==='all'){
            createdFilter= state.allRecipes;
        }
        if(!createdFilter){
            return{
                ...state,
                error:{ created:true}
            }
        }

        return {
            ...state,
            recipes: createdFilter,
            error:{},
        }
        // return {
        //     ...state,
        //     recipes: action.payload==='all'?
        //     state.allRecipes: createdFilter
        // }
        
        /***********************************/



    }    
};

export default rootReducer;