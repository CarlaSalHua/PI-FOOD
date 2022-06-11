import React from "react";
import { useDispatch } from "react-redux";
import { filter_created } from "../../redux/actions";

const FilterByCreated = ()=> {
    const dispatch = useDispatch();


    const handleFilterByCreated= (e)=>{
        e.preventDefault();
        dispatch(filter_created(e.target.value))
    };

    return (
        <div>
            <label htmlFor=''>Filter by Created</label>
            <select onChange={handleFilterByCreated}>
                        <option value= 'all'>All recipes</option>
                        <option value= 'created'>Created recipes</option>
                        <option value= 'api'>Existing recipes</option>
            </select>
        </div>
    );

};

export default FilterByCreated;