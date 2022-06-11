import React, {useState} from "react";
import{useDispatch} from 'react-redux';
import { recipesByName } from "../../redux/actions";

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
        <div onSubmit={handleSubmit}>
            <form action=''>
                <input
                type='text'
                placeholder='Search recipe by name...'
                value={name}
                onChange={handleChange}
                //autoComplete='off'
                />
            </form>
            <button onClick={handleSubmit} type='submit' value=''>Search</button>

        </div>
    )
};


export default Search;