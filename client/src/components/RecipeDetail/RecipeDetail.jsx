import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import {useNavigate} from 'react-router-dom'

import { recipesById } from "../../redux/actions";

const RecipeDetail = () => {
  // const dispatch = useDispatch();
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

  // if(Array.isArray(details)){
  //     recipeDetail=details[0];
  // }
  // else{
  //     recipeDetail=details;
  // }

  // const diets = details.dietTypes ? details.dietTypes.map(e => e.name) : details.diets;

  return (
    
    <div>
        { details.id?
            <div className='recipeDetail'>
                <h1>{details.name}</h1>
                <div>
                    {/* <span>Edit Recipe</span> */}
                    {/* <Link to={`/updateRecipe/${details.id}`}></Link> */}
                {/* </div> */}
                </div>

                <div className='detail'>
                    <div >
                        <div>
                            <h4>Score:<span>{details.healthScore}</span></h4>
                            <h5>Score2</h5>
                        </div>
                        <img src={details.image} alt={details.name}/>

                        <div>
                            <h4>Diet Types:</h4>
                            <p>{details.diets?.join(', ').toUpperCase()}</p>
                        </div>
                    </div>
                    <div>
                        <h3>About this recipe:</h3>
                        <p>{details.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g,'')}</p>
                    </div>
                </div>

                { details.steps ?
                    <div>
                        <h3>Step by step:</h3>
                        <div className='stepList'>
                            {
                              details?.steps?.map((e,i)=>{return (
                                <div key={i}
                                className='step'>
                                    <p>{`${e.num}. ${e.step}`}</p>
                                </div>
                              )})
                            }
                        </div>
                    </div>
                : <div>
                </div>
                }
            </div>
           :
            <img className='imgLoading' src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt="" />
        }
    </div>
  );
};

export default RecipeDetail;
