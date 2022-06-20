import React from "react";
import { useDispatch } from "react-redux";
import { getTypesDiets } from "../../redux/actions";
import s from './Filters.module.css'
const FilterDietTypes=() => {

    const dispatch= useDispatch();

    const handleDietType=(e)=>{
        e.preventDefault();
        //console.log('console 2',e.target.value)
        dispatch(getTypesDiets(e.target.value))
    };

    return(
        <div className={s.filterDiets}>
            <label>Filter by diet types</label>
                <select onChange={handleDietType}>
                        <option value='all'>All type diets</option>
                        <option value='gluten free'>Gluten-free</option>
                        <option value='dairy free'>Dairy free</option>
                        <option value='fodmap friendly'>Fodmap friendly</option>
                        <option value='ketogenic'>Ketogenic</option>
                        <option value='primal'>Primal</option>
                        <option value='lacto ovo vegetarian'>Lacto-ovo-vegetarian</option>
                        <option value='vegan'>Vegan</option>
                        <option value='paleolithic'>Paleolithic</option>
                        <option value='whole 30'>Whole30</option>
                        <option value='pescatarian'>Pescetarian</option>
                </select>
        </div>
    );
};

export default FilterDietTypes;