import React, { useState} from 'react';
//import { getAllRecipes } from '../../redux/actions';
import s from './Paginacion.module.css'

const Pagination= ({page, setPage ,total})=> {
    const [currentPage, setCurrentPage]= useState(1);

    const nextPage= ()=> {
        setCurrentPage(parseInt(currentPage)+1);
        setPage(parseInt(page)+1);
    };

    const previousPage= ()=> {
        setCurrentPage(parseInt(currentPage)-1);
        setPage(parseInt(page)-1);
    };
    
    const handleInputs=(e)=> {
        setCurrentPage(parseInt(e.target.value));
        setPage(parseInt(e.target.value));
    };

    const pageNumbers=[];
    for(let i=1; i<=total; i++){
        pageNumbers.push(i);
    };

    return (
        <div className={s.contentPagination}>
            <button disabled={page ===1||page <1} onClick={previousPage} className={s.paginationButton}> 
            <span className="title">↩</span>
            </button>
            
            {   pageNumbers&&
                pageNumbers.map((v)=>(
                    <button value={v} onClick={(e)=>handleInputs(e)} key={v} className={`${s.paginationButton} ${
                        currentPage === parseInt(v) ? s.inputActive : null
                      }`}>
                        {v}
                    </button>
                ))
            }
            
            <button disabled={page ===total || page >total} onClick={nextPage} className={s.paginationButton}>
                <span className="title">↪</span>
            </button>
        </div>
    );
};


export default Pagination;