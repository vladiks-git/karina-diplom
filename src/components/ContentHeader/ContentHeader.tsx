import React, { FC } from 'react';

import './style.scss';
import { LeftCircleOutlined } from '@ant-design/icons';
interface IContentHeaderProps {
    title: string;
    onBack?: () => void;
}
export const ContentHeader: FC<IContentHeaderProps> = ({ title, onBack }) => {
    return (
        <div className={'content-header'}>
            <p className="content-header__title">{title}</p>
            {onBack && (
                <div className={'content-header__back'} onClick={onBack}>
                    <LeftCircleOutlined width={'40'} height={'40'} /> Назад
                </div>
            )}
        </div>
    );
};
