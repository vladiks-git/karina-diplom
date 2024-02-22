import React from 'react';
import { ContentHeader } from '../../components/ContentHeader/ContentHeader';
import { ContentWrapper } from '../../components/ContentWrapper/ContentWrapper';
import { Card } from '../../ui-kit/Card/Card';
import { Timeline } from 'antd';

import './style.scss';

export const СounterpartyPage = () => {
    return (
        <>
            <ContentHeader title={'Проект твой тай'} />
            <ContentWrapper>
                <Card>
                    <p>Отслеживание реализации проекта</p>
                    <div className={'counterparty__timeline-wrapper'}>
                        <Timeline
                            mode={'left'}
                            items={[
                                {
                                    color: 'green',
                                    label: '2015-09-01',
                                    children: (
                                        <div
                                            className={
                                                'counterparty__timeline-item'
                                            }
                                        >
                                            <p>f1321</p>
                                            <p>f1321dwqdqwd</p>
                                        </div>
                                    ),
                                },
                                {
                                    label: '2015-09-01 09:12:11',
                                    children: 'Solve initial network problems',
                                },
                                {
                                    children: 'Technical testing',
                                },
                                {
                                    label: '2015-09-01 09:12:11',
                                    children: 'Network problems being solved',
                                },
                            ]}
                        />
                    </div>
                </Card>
            </ContentWrapper>
        </>
    );
};
