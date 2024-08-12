import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from 'react-router-dom'


const Navbar = () => {

    return (
            <nav className={styles.navbar}>
                <ul className={styles.links_list}>
                    <li>
                        <NavLink to="/" className={({isActive}) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/Session" className={({isActive}) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Insert" className={({isActive}) => `${styles.noEffect} ${isActive ? styles.active : ""}`}>Inserir</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }

export default Navbar