import React, { FC, PropsWithChildren } from 'react';

import './style.scss';
const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={'content-wrapper'}>{children}</div>;
};

export default ContentWrapper;
