import React from 'react';
import { useDispatch } from 'react-redux';
import { filter_health_score } from '../../redux/actions';

const FilterHealthScore=()=>{
    const dispatch= useDispatch();

    const handleHealthScore= (e)=> {
        e.preventDefault();
        dispatch(filter_health_score(e.target.value))
    };

    return (
        <div>
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