import React, { FC } from 'react';

import './style.scss';
interface IContentHeaderProps {
    title: string;
}
export const ContentHeader: FC<IContentHeaderProps> = ({ title }) => {
    return (
        <div className={'content-header'}>
            <p className="content-header__title">{title}</p>
        </div>
    );
};
