import React from 'react';
import {useDispatch} from 'react-redux';
import { filterA_Z } from '../../redux/actions';
import s from './Filters.module.css'

const FilterAlphabetical= ({setPage}) => {
    
    const dispatch= useDispatch();
    
    const handleAlphabetical= (e)=> {
        e.preventDefault();
        dispatch(filterA_Z(e.target.value))
        setPage(1);
    };

    return (
        <div className={s.filterOrder}>
            <label htmlFor=''>Filter by A-Z</label>
                <select defaultValue={'all'} onChange={handleAlphabetical}>
                    <option value='all' hidden >All recipes</option>
                    <option value= 'a-z'>Ascendant (A-Z)</option>
                    <option value= 'z-a'>Descendant (Z-A)</option>
                </select>
        </div>
    );
};

export default FilterAlphabetical;