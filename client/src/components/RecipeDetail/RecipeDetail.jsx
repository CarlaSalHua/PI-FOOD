import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { recipesById } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from './RecipeDetail.module.css';
import Diet from "../DietTypes/DietTypes";

const RecipeDetail = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const details = useSelector((state) => state?.recipeDetail);
  //let recipeDetail;
  //console.log(details)
  useEffect(() => {
    if (details) {
      dispatch(recipesById(id));
    }
  },[]);

  const [openSteps, setOpenSteps]=useState(false);

  // if(Array.isArray(details)){
  //     recipeDetail=details[0];
  // }
  // else{
  //     recipeDetail=details;
  // }

  // const diets = details.dietTypes ? details.dietTypes.map(e => e.name) : details.diets;

  return (
    
    <div className={s.contentDetail}>
        { details.id?
            <div className={s.content2}>
                <h1 className={s.title}>{details.name}</h1>
                <div>
                    {/* <span>Edit Recipe</span> */}
                    {/* <Link to={`/updateRecipe/${details.id}`}></Link> */}
                {/* </div> */}
                </div>

                <div className='detail'>
                    <div className={s.imageDetail} >
                        <img src={details.image} alt={details.name}/>
                    </div>
                    {/* **********************************  */}
                    <div className={s.healthScore}>
                            <h4><span>{details.healthScore}</span><br/>Health Score</h4>
                    </div>
                    {/* **********************************  */}
                    <Diet diets={details.diets} className={s.contentDiets}>
                            {/* <p>{details.diets?.join(', ').toUpperCase()}</p> */}
                    </Diet>
                    {/* **********************************  */}
                    <div className={s.contentSummary}>
                        <h3>About this recipe:</h3>
                        <p>{details.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g,'')}</p>
                    </div>
                
                {details.steps?
                    (<div className={s.buttonContainer}>
                    <button onClick={()=>setOpenSteps(!openSteps)}>Step by step</button>
                </div>):<div/>
                
                } 

                <span>
                {openSteps&&(
                    <div className={s.contentStep}>
                        <button onClick={()=>setOpenSteps(!openSteps)}>
                        x
                        </button>
                        <h3>Step by step</h3>
                        <ol className='stepList'>
                            {
                                details?.steps?.map((e,i)=>{return (
                                    <div key={i}
                                    className='step'>
                                    <p>{`${e.num}. ${e.step}`}</p>
                                </div>
                              )})
                            }
                        </ol>
                    </div>
                )}
                </span>
                </div>
            </div>

           : <h1> 
            loading
           </h1>
            
            // <img className='imgLoading' src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt="" />
        }
        <Link to='/home'><button className={s.backButton}>Back Home</button></Link>
    </div>
  );
};

export default RecipeDetail;
