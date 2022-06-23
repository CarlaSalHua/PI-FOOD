import React from 'react';
import { useDispatch } from 'react-redux';
import { filter_health_score } from '../../redux/actions';
import s from './Filters.module.css'

const FilterHealthScore=({setPage})=>{
    const dispatch= useDispatch();

    const handleHealthScore= (e)=> {
        e.preventDefault();
        dispatch(filter_health_score(e.target.value));
        setPage(1);
    };

    return (
        <div className={s.filterHealthScore}>
            <label htmlFor=''>Filter by score</label>
            <select defaultValue={'all'} onChange={handleHealthScore}>
                        <option value= 'all' hidden>All recipes</option>
                        <option value= 'min-max'>Lower Score</option>
                        <option value= 'max-min'>Higher Score</option>
            </select>
        </div>
    );
}

export default FilterHealthScore;