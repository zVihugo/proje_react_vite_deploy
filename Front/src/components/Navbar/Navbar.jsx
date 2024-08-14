import styles from './Navbar.module.css'
import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'



const Navbar = () => {

    return (
            <nav className={styles.navbar}>
                
                <ul className={styles.links_list}>
                    <li>
                        <NavLink to="/" className={({isActive}) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Home</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }

export default Navbar