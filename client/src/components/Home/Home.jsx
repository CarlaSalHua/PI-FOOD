import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Pagination from '../Paginacion/Paginacion'
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";

import FilterAlphabetical from "../Filters/FilterAlphabetical";
import FilterDietTypes from "../Filters/FilterDietTypes";
import FilterHealthScore from "../Filters/FilterHealthScore";
import FilterByCreated from "../Filters/FilterByCreated";
import s from "../Home/Home.module.css";
//import rootReducer from '../../reducer';

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  //let [loading, setLoading]= useState(true);
  //console.log(allRecipes)

  useEffect(() => {
      dispatch(getAllRecipes());
    }, [dispatch]);
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllRecipes());
    }
    
    //PAGINATION
    const [page, setPage]= useState(1);
    const [forPage]= useState(9);
    const total= Math.ceil(allRecipes.length/forPage);
    console.log('Home', total , 'page',page, 'forPage', forPage )

  return (
    <div className="contenedorHome">
      
      <div>
          <div>
          <NavBar />
          </div>
          {/*********************************************/}
          <div>
            <button onClick={(e)=> handleClick(e)}>
              Load recipes 🍽
            </button>
            <SearchBar />
          </div>
          {/*********************************************/}
          <div>
              <div>
                <h3>Recipes</h3>
                <FilterByCreated />
              </div>
              <div>
                <h3>Alphabetical order</h3>
                <FilterAlphabetical />
              </div>
              <div>
                <h3>Health Score</h3>
                <FilterHealthScore />
              </div>
              <div>
                <h3>Diet types</h3>
                <FilterDietTypes />
              </div>
          </div>
          {/**********************************************/}
          <div>
              <div className={s.cardGrid}>
                { allRecipes.length>0?

                  ( allRecipes?.slice((page-1)* forPage, (page-1)*forPage+forPage).map((e) => {
                      return (
                          <fragment className={s.card}>
                          <Card
                              id={e.id}
                              name={e.name}
                              image={e.image}
                              summary={e.summary}
                              diets={e.diets}
                              healthScore={e.healthScore}
                              step={e.step}
                          />
                          </fragment>
                      )
                  })
                  ): !allRecipes.length>0?(
                    <Loading/>
                  ): (
                    <NotFound/>
                  )
                }
              </div>
                <Pagination page={page} setPage={setPage} total={total}/>
          </div>
          {/**********************************************/}
      </div>


    </div>
    );
};

export default Home;
