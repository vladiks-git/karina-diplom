import React from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Table } from 'antd';

export const EmployerProjectList = () => {
    const columns = [
        {
            title: 'Проект - контрагент',
            render: () => <p>проект-контрагент</p>,
        },
        {
            title: 'Действия',
            render: () => <p>дкйствия</p>,
        },
    ];

    const testData = [
        {
            id: '1',
            username: 'fio',
            role: 'admin',
        },
    ];

    return (
        <>
            <ContentHeader title={'Список проектов'} />
            <ContentWrapper>
                <Table
                    dataSource={testData}
                    columns={columns}
                    pagination={false}
                />
            </ContentWrapper>
        </>
    );
};
