import React from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Card } from '../../../ui-kit/Card/Card';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { projectManagerRoutes } from '../../../consts/routes';

const ProjectsList = () => {
    const navigate = useNavigate();

    const handleAdd = () => navigate(projectManagerRoutes.create);

    const columns = [
        {
            title: 'Проект - контрагент',
            render: () => <p>проект-контрагент</p>,
        },
        {
            title: 'Действия',
            render: () => <p>дкйствия</p>,
        },
        {
            title: '',
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
            <ContentHeader title={'Список проектов и контрагентов'} />
            <ContentWrapper>
                <Card>
                    <Button
                        style={{ marginBottom: '20px' }}
                        type={'primary'}
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Добавить проект
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

export default ProjectsList;
