import React from 'react';
import {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../../redux/actions';
import Card from '../Card/Card';
import Search from '../SearchBar/SearchBar';
import FilterAlphabetical from '../Filters/FilterAlphabetical';
import FilterDietTypes from '../Filters/FilterDietTypes';
import FilterHealthScore from '../Filters/FilterHealthScore';
import FilterByCreated from '../Filters/FilterByCreated';
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
                        <FilterByCreated/>
                </div>
                <div>
                    <h3>Alphabetical order</h3>
                        <FilterAlphabetical/>
                </div>
                <div>
                    <h3>Health Score</h3>
                        <FilterHealthScore/>
                    
                </div>
                <div>
                    <h3>Diet types</h3>
                        <FilterDietTypes/>
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


    