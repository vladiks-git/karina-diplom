import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import './style.scss';
import { Card } from '../../../ui-kit/Card/Card';
import { useForm } from 'antd/es/form/Form';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { useNavigate, useParams } from 'react-router';
import { adminRoutes } from '../../../consts/routes';
import { IUser } from '../../../types/user';
import { Roles, rolesOptions } from '../../../consts/common';
import {
    useCreateUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} from '../../../api/adminApi';
import { toast } from 'react-toastify';
import { skipToken } from '@reduxjs/toolkit/query';

const CreateEditUser = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const { id: paramsId } = useParams();

    const { userById } = useGetUserByIdQuery(paramsId ? +paramsId : skipToken, {
        selectFromResult: ({ data }) => ({
            userById: {
                role: data?.role || Roles.EMPLOYER,
                password: data?.password || '',
                email: data?.email || '',
                username: data?.username || '',
                phone: data?.phone || '',
            },
        }),
    });
    useEffect(() => {
        form.setFieldsValue({ ...userById });
    }, [userById]);

    const [createUser, { isSuccess: isSuccessCreate }] =
        useCreateUserMutation();

    const [updateUser, { isSuccess: isSuccessUpdate }] =
        useUpdateUserMutation();

    useEffect(() => {
        if (isSuccessCreate) {
            navigate(`/${adminRoutes.root}`);
            toast.success('Успешно создано!');
        }
        if (isSuccessUpdate) {
            navigate(`/${adminRoutes.root}`);
            toast.success('Успешно Обновлено!');
        }
    }, [isSuccessCreate, isSuccessUpdate]);

    const handleFinish = (values: IUser) => {
        if (paramsId) {
            updateUser({
                ...values,
                id: +paramsId,
            });
        } else {
            createUser(values);
        }
    };

    const handleBack = () => {
        form.resetFields();
        navigate(`/${adminRoutes.root}`);
    };

    return (
        <>
            <ContentHeader
                title={'Создание новой учетной записи'}
                onBack={handleBack}
            />
            <ContentWrapper>
                <Card>
                    <div className={'create-user'}>
                        <div className="create-user__title">
                            Введите данные для создания нового пользователя
                        </div>
                        <Form
                            form={form}
                            initialValues={userById}
                            onFinish={handleFinish}
                        >
                            <div className="create-user__form-inner">
                                <div className={'create-user__row'}>
                                    <Form.Item name={'username'}>
                                        <Input
                                            placeholder={'Bмя пользователя'}
                                        />
                                    </Form.Item>
                                    <Form.Item name={'email'}>
                                        <Input placeholder={'E-mail'} />
                                    </Form.Item>
                                    <Form.Item name={'password'}>
                                        <Input placeholder={'Пароль'} />
                                    </Form.Item>
                                </div>
                                <div className={'create-user__row'}>
                                    <Form.Item name={'phone'}>
                                        <Input placeholder={'Номер телефона'} />
                                    </Form.Item>
                                    <Form.Item name={'role'}>
                                        <Select
                                            disabled={Boolean(paramsId)}
                                            options={rolesOptions}
                                            placeholder={'Роль пользователя'}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="create-user__btns">
                                <Button onClick={handleBack}>Отмена</Button>
                                <Button type={'primary'} htmlType={'submit'}>
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </ContentWrapper>
        </>
    );
};

export default CreateEditUser;
