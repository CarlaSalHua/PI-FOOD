import React, {useState} from "react";
import{useDispatch} from 'react-redux';
import {recipesByName } from "../../redux/actions";
import searchButton from '../../imagenes/search_icon.png'
import s from './SearchBar.module.css'

const Search =()=>{
    const dispatch =useDispatch();
    const [name, setName]= useState('');

    const handleChange=(e)=>{
        e.preventDefault();
        setName(e.target.value)
    };

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(recipesByName(name));
        setName('');
    };

    return (
        <div onSubmit={handleSubmit} className={s.containerBar}>
            
            <form className={s.container} action=''>
                <input className={s.input} type='text' placeholder='Search recipe by name...' value={name} onChange={handleChange}
                //autoComplete='off'
                />
                <button onClick={handleSubmit}  type='submit' value=''>
                    <img src={searchButton} alt=''/>
                </button>
            </form>

        </div>
    )
};


export default Search;