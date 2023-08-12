import React from 'react';
import { NavLink, Link, Outlet } from "react-router-dom";
import './style.css';

export default function Teams() {

    return (
        <>
            <div>
                Команды
                <NavLink
                    to='11'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                11
                </NavLink>;
                <NavLink
                    to='12'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                12
                </NavLink>;
                <Outlet />
            </div>
        </>
    )
}