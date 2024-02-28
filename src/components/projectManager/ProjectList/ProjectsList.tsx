import React, { useEffect } from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Card } from '../../../ui-kit/Card/Card';
import { Button, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { projectManagerRoutes } from '../../../consts/routes';
import {
    useDeleteProjectMutation,
    useGetProjectsQuery,
} from '../../../api/projectManager';
import { ProjectStatuses } from '../../../consts/common';
import { ICreatedProject } from '../../../types/project';
import { toast } from 'react-toastify';

const statusColor: Record<ProjectStatuses, string> = {
    [ProjectStatuses.ASSIGNED]: 'cyan',
    [ProjectStatuses.CLOSED]: 'red',
    [ProjectStatuses.IN_WORK]: 'blue',
    [ProjectStatuses.SOLVED]: 'green',
};

const ProjectsList = () => {
    const navigate = useNavigate();

    const { data: projects } = useGetProjectsQuery();

    const [deleteProject, { isSuccess: isSuccessDelete }] =
        useDeleteProjectMutation();

    useEffect(() => {
        if (isSuccessDelete) toast.success('Успешно удалено!');
    }, [isSuccessDelete]);

    const handleAdd = () => navigate(projectManagerRoutes.create);

    const handleEdit = (id: number) =>
        navigate(`${projectManagerRoutes.create}/${id}`);

    const handleDelete = (id: number) => {
        deleteProject(id);
    };

    const columns = [
        {
            title: 'Проект - контрагент',
            render: (project: ICreatedProject) => (
                <p>
                    {project.name} - {project.counterparty.username}
                </p>
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status: ProjectStatuses) => (
                <Tag color={statusColor[status]}>{status}</Tag>
            ),
        },
        {
            title: '',
            render: (project: ICreatedProject) => (
                <Button
                    onClick={() => handleEdit(project.id)}
                    type={'text'}
                    style={{ color: 'blue' }}
                >
                    Редактировать
                </Button>
            ),
        },
        {
            title: '',
            key: 'delete',
            render: (project: ICreatedProject) => (
                <Button onClick={() => handleDelete(project.id)} danger>
                    Удалить
                </Button>
            ),
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
                        dataSource={projects}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </ContentWrapper>
        </>
    );
};

export default ProjectsList;
