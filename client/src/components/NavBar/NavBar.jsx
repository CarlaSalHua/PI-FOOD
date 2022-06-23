import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import s from './NavBar.module.css';
import logo from '../../imagenes/Logos/logoNature.png';

const NavBar= ({setPage})=> {
    // const [page, setPage]= useState(1);

    return(
        <nav className={s.contentNavbar}>
                
                <div className={s.title}>
                    <Link to='/home' className={s.title}>
                    <img src={logo} alt='' className={s.logo}/>
                    <h1 className={s.logoName}>Healthy Food Web</h1>
                    </Link>
                </div>


                <div className={s.menu}>
                    <div className={s.list}>
                        <div className={s.searchBar}>
                        <SearchBar className={s.searchBar} setPage={setPage} />
                        </div>
                        <Link to={'/createRecipe'} className={s.recipe} >
                            <span>Create my recipe</span>
                        </Link>
                        
                        <Link to={'/home'} className={s.home}>
                            <span>Home</span>
                        </Link>
                        {/* <Link to={'/aboutMe'}>
                            <span>About the creator</span>
                        </Link> */}
                    </div>
                </div>

        </nav>
    );
};

export default NavBar;