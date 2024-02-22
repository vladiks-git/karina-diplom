import React, { FC, PropsWithChildren } from 'react';

import './style.scss';
export const Card: FC<PropsWithChildren> = ({ children }) => {
    return <div className={'card'}>{children}</div>;
};
