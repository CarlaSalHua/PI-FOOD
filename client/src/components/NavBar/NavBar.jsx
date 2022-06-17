import React from 'react';
import {Link} from 'react-router-dom';

const NavBar= ()=> {
    return(
        <nav>
            <Link to='/home'>
                <h1>Healthy Food</h1>
            </Link>

            <div>
                <Link to={'/createRecipe'}>
                    <span>Create my recipe</span>
                </Link>
                
                <Link to={'/home'}>
                    <span>Home</span>
                </Link>
                {/* <Link to={'/aboutMe'}>
                    <span>About the creator</span>
                </Link> */}
            </div>
        </nav>
    );
};

export default NavBar;