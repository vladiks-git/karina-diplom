import React from 'react';
import { Header } from '../../components/Header/Header';

import './style.scss';
import { Outlet } from 'react-router';
export const MainLayout = () => {
    return (
        <div className={'main-layout'}>
            <Header />
            <div className="main-layout__content">
                <div className="main-layout__sidebar"></div>
                <div className="main-layout__main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
