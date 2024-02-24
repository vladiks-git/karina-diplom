import React, { useEffect } from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { Card } from '../../../ui-kit/Card/Card';
import { Button, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { useNavigate } from 'react-router';
import { adminRoutes } from '../../../consts/routes';
import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
} from '../../../api/adminApi';
import { Roles } from '../../../consts/common';
import { IUser } from '../../../types/user';
import { toast } from 'react-toastify';

const tagColor = {
    [Roles.ADMIN]: 'red',
    [Roles.COUNTERPARTY]: 'blue',
    [Roles.EMPLOYER]: 'green',
    [Roles.PROJECT_MANAGER]: 'cyan',
};

export const Users = () => {
    const navigate = useNavigate();

    const { data: users = [] } = useGetAllUsersQuery();
    const [deleteUser, { isSuccess }] = useDeleteUserMutation();

    const handleAdd = () => navigate(adminRoutes.create);

    const handleDelete = (id: number) => {
        console.log(id);
        deleteUser(id);
    };

    const handleEdit = (id: number) => {
        navigate(`${adminRoutes.create}/${id}`);
    };

    useEffect(() => {
        if (isSuccess) toast.success('Успешно удалено!');
    }, [isSuccess]);

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
            render: (role: Roles) => <Tag color={tagColor[role]}>{role}</Tag>,
        },
        {
            title: 'Редактировать',
            // рендер тега
            render: (user: IUser) => (
                <Button
                    onClick={() => handleEdit(user.id)}
                    type={'text'}
                    style={{ color: 'blue' }}
                >
                    Редактировать
                </Button>
            ),
        },
        {
            title: 'Удалить',
            key: 'delete',
            render: (user: IUser) => (
                <Button onClick={() => handleDelete(user.id)} danger>
                    Удалить
                </Button>
            ),
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
                        onClick={handleAdd}
                    >
                        Добавить
                    </Button>
                    <Table
                        dataSource={users}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </ContentWrapper>
        </>
    );
};
