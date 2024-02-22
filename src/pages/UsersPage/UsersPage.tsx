import React from 'react';
import { ContentHeader } from '../../components/ContentHeader/ContentHeader';
import { Card } from '../../ui-kit/Card/Card';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';

export const UsersPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя пользователя',
            dataIndex: 'username',
            key: 'Имя пользователя',
        },
        {
            title: 'Роль пользователя',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Действия',
            // рендер тега
            render: () => <div>action</div>,
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
            <ContentHeader title={'Список пользователей'} />
            <ContentWrapper>
                <Card>
                    <Button
                        style={{ marginBottom: '20px' }}
                        type={'primary'}
                        icon={<PlusOutlined />}
                    >
                        Добавить
                    </Button>
                    <Table
                        dataSource={testData}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </ContentWrapper>
        </>
    );
};
