import React, {useState} from "react";
import{useDispatch} from 'react-redux';
import {recipesByName } from "../../redux/actions";
import searchButton from '../../imagenes/search_icon.png';
import validationSearch from "./Validation";
import s from './SearchBar.module.css'

const Search =({setPage})=>{
    const dispatch =useDispatch();
    const [name, setName]= useState('');
    const [errorName, setErrorName] = useState('');
 //******************* */
    const handleChange=(e)=>{
        e.preventDefault();
        setName(e.target.value);
    };
//************* */
    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(recipesByName(name));
        let validation = validationSearch(e.target.value);
        setErrorName(validation);
        setName('');
        setPage(1);
    };

    return (
        <div onSubmit={handleSubmit} className={s.containerBar}>
            
            <form className={s.container} action=''>
                <input className={s.input} type='text' placeholder='Search recipe by name...' value={name} onChange={(e)=>handleChange(e)}
                //autoComplete='off'
                />
                <button onClick={handleSubmit}  type='submit' value=''>
                    <img src={searchButton} alt=''/>
                <span>{errorName}</span>
                </button>
            </form>

        </div>
    )
};


export default Search;