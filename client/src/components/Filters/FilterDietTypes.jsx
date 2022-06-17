import React from "react";
import { useDispatch } from "react-redux";
import { getTypesDiets } from "../../redux/actions";

const FilterDietTypes=() => {

    const dispatch= useDispatch();

    const handleDietType=(e)=>{
        e.preventDefault();
        //console.log('console 2',e.target.value)
        dispatch(getTypesDiets(e.target.value))
    };


    return(
        <div>
            <label>Filter by diet types</label>
                <select onChange={handleDietType}>
                        <option value='all'>All type diets</option>
                        <option value='gluten free'>gluten-free</option>
                        <option value='dairy free'>dairy free</option>
                        <option value='ketogenic'>ketogenic</option>
                        <option value='vegetarian'>vegetarian</option>
                        <option value='primal'>primal</option>
                        <option value='lacto vegetarian'>lacto-vegetarian</option>
                        <option value='ovo vegetarian'>ovo-vegetarian</option>
                        <option value='vegan'>vegan</option>
                        <option value='paleo'>paleo</option>
                        <option value='low fodmap'>low-fodmap</option>
                        <option value='whole30'>whole30</option>
                </select>
        </div>
    );


};

export default FilterDietTypes;