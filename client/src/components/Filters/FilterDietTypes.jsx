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
                        <option value='fodmap friendly'>fodmap friendly</option>
                        <option value='ketogenic'>ketogenic</option>
                        <option value='primal'>primal</option>
                        <option value='lacto ovo vegetarian'>lacto-ovo vegetarian</option>
                        <option value='vegan'>vegan</option>
                        <option value='paleolithic'>paleolithic</option>
                        <option value='whole 30'>whole30</option>
                        <option value='pescatarian'>pescetarian</option>
                </select>
        </div>
    );
};

export default FilterDietTypes;