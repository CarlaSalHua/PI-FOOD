import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes } from '../../actions';

const Home = ()=> {
    const dispatch= useDispatch();
    const recipes= useSelector((e)=>e.recipe)

    let [loading, setLoading]= useState(true);
};

export default (
    Home
);


    