import React, { useState} from 'react';
//import { getAllRecipes } from '../../redux/actions';


const Pagination= ({page, setPage ,total})=> {
    //const [posts, setPosts]= useState([]);
    // const [postsPerPage, setPostPerPage]= useState(9);
    const [currentPage, setCurrentPage]= useState(1);

    const nextPage= ()=> {
        setCurrentPage(parseInt(currentPage)+1);
        setPage(parseInt(page)+1);
    };

    const previousPage= ()=> {
        setCurrentPage(parseInt(currentPage)-1);
        setPage(parseInt(page)-1);
    };
    
    const handlePages=(e)=> {
        setCurrentPage(parseInt(e.target.value));
        setPage(parseInt(e.target.value));
    };

    const pageNumbers=[];
    for(let i=1; i<=total; i++){
        pageNumbers.push(i);
    };

    // //GETTING CURRENT POST:
    // const indexOfLastPost= currentPage*postsPerPage;
    // const indexOfFirstPost= indexOfLastPost-postsPerPage;
    // const currentPosts= posts.slice(indexOfFirstPost, indexOfLastPost);

    // //CHANGING PAGE:
    // const paginate= (pageNumber)=> setCurrentPage(pageNumber);


    return (
        <div>
            <button disabled={page ===1||page <1} onClick={previousPage}> 
            <span className="title">↩</span>
            </button>
            {   pageNumbers&&
                pageNumbers.map((v)=>(
                    <button value={v} onClick={(e)=>handlePages(e)} key={v}>
                        {v}
                    </button>
                ))
            }

            <button disabled={page ===total || page >total} onClick={nextPage}>
            <span className="title">↪</span>
            </button>

        </div>
    );
};

export default Pagination;