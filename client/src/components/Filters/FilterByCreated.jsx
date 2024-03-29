import React from "react";
import { useDispatch } from "react-redux";
import { filter_created } from "../../redux/actions";
import s from './Filters.module.css'

const FilterByCreated = ({setPage})=> {
    const dispatch = useDispatch();

    const handleFilterByCreated= (e)=>{
        e.preventDefault();
        dispatch(filter_created(e.target.value));
        setPage(1);
    };

    return (
        <div className={s.filterCreated}>
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