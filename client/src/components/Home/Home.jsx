import React from 'react';
import {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../../redux/actions';
import Card from '../Card/Card';
import Search from '../SearchBar/SearchBar';
import s from '../Home/Home.module.css'
//import rootReducer from '../../reducer';

const Home=()=> {
    const dispatch= useDispatch();
    const allRecipes= useSelector((state)=>state.recipes)

    //let [loading, setLoading]= useState(true);

    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes());
    }

    return (
        <div>
            <h1>Healthy Food</h1>
            <Link to='/recipes'>Create my Recipe</Link>
            <div>
                <button onClick={e=> {handleClick(e)}}>Load recipes</button>
                <Search/>
            </div>

            <div>
                <div>
                    <h3>Recipes</h3>
                    <select>
                        <option value= 'All'>All recipes</option>
                        <option value= 'Api'>Existing recipes</option>
                        <option value= 'Created'>Created recipes</option>
                    </select>
                </div>
                <div>
                    <h3>Alphabetical order</h3>
                    <select>
                        <option value= 'All'>All recipes</option>
                        <option value= 'asc'>Ascendant (A-Z)</option>
                        <option value= 'desc'>Descendant (Z-A)</option>
                    </select>
                </div>
                <div>
                    <h3>Health Score</h3>
                    <select>
                        <option value= 'All'>All recipes</option>
                        <option value= 'higher'>Higher Score</option>
                        <option value= 'lower'>Lower Score</option>
                    </select>
                </div>
                <div>
                    <h3>Diet types</h3>
                    <select>
                        <option value= 'All'>All type diets</option>
                        <option value='glutenfree'>gluten-free</option>
                        <option value='ketogenic'>ketogenic</option>
                        <option value='vegetarian'>vegetarian</option>
                        <option value='lactovegetarian'>lacto-vegetarian</option>
                        <option value='ovovegetarian'>ovo-vegetarian</option>
                        <option value='vegan'>vegan</option>
                        <option value='paleo'>paleo</option>
                        <option value='lowfodmap'>low-fodmap</option>
                        <option value='whole30'>whole30</option>
                    </select>
                </div>

            </div>
            <div className={s.cardGrid}>
                {allRecipes.length?
                allRecipes.map((e)=>{
                    return(
                    <fragment className='card'>
                        <Card 
                            id={e.id} 
                            name={e.name} 
                            image={e.image} 
                            summary={e.summary} 
                            diets={e.diets} 
                            healthyScore={e.healthyScore} 
                            step={e.step}
                        />
                    </fragment>      
                 )}): <img className='imgLoading' src="https://i.pinimg.com/originals/c4/cb/9a/c4cb9abc7c69713e7e816e6a624ce7f8.gif" alt="" />
                //  <h1>Loading...</h1>
                 
                }
            </div>
        </div>
    );
};


export default Home;


    