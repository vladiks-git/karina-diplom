import React from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Button, Table } from 'antd';
import { useGetEmployerProjectsQuery } from '../../../api/employerApi';
import { useAuthMutation } from '../../../api/authApi';
import { KEY_AUTH } from '../../../consts/common';
import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate, useParams } from 'react-router';
import { employerRoutes } from '../../../consts/routes';

export const EmployerProjectList = () => {
    const navigate = useNavigate();

    const [login, { data }] = useAuthMutation({
        fixedCacheKey: KEY_AUTH,
    });

    const userId = data?.id;

    const { data: projects } = useGetEmployerProjectsQuery(
        userId ? userId : skipToken
    );

    const handleEdit = (id: number) => {
        navigate(`${employerRoutes.project}/${id}`);
    };

    const columns = [
        {
            title: 'Проект - контрагент',
            render: (project: any) => (
                <p>
                    {project.name} - {project.counterpartyName}
                </p>
            ),
        },
        {
            title: '',
            render: (project: any) => (
                <Button
                    onClick={() => handleEdit(project.id)}
                    type={'text'}
                    style={{ color: 'blue' }}
                >
                    Подробнее
                </Button>
            ),
        },
    ];

    return (
        <>
            <ContentHeader title={'Список проектов'} />
            <ContentWrapper>
                <Table
                    dataSource={projects}
                    columns={columns}
                    pagination={false}
                />
            </ContentWrapper>
        </>
    );
};
