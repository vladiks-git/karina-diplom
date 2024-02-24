import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import './style.scss';
import { useAuthMutation } from '../../api/authApi';
import { useNavigate } from 'react-router';
import { Roles } from '../../consts/common';
import {
    adminRoutes,
    counterpartyRoutes,
    employerRoutes,
    projectManagerRoutes,
} from '../../consts/routes';
export const AuthPage = () => {
    const navigate = useNavigate();
    const [login, { data, isSuccess }] = useAuthMutation();

    const [form] = useForm();

    useEffect(() => {
        if (isSuccess && data) {
            const role = data.role;
            if (role === Roles.ADMIN) {
                navigate(`/${adminRoutes.root}`);
            }
            if (role === Roles.COUNTERPARTY) {
                navigate(`/${counterpartyRoutes.root}`);
            }
            if (role === Roles.EMPLOYER) {
                navigate(`/${employerRoutes.root}`);
            }
            if (role === Roles.PROJECT_MANAGER) {
                navigate(`/${projectManagerRoutes.root}`);
            }
        }
    }, [isSuccess]);

    const handleFinish = (values: { email: string; password: string }) => {
        login(values);
    };

    return (
        <div className={'auth-page'}>
            <div className="auth-page__card">
                <p className="auth-page__title">Авторизация</p>
                <Form onFinish={handleFinish} form={form}>
                    <Form.Item name={'email'}>
                        <Input placeholder={'Email'} />
                    </Form.Item>
                    <Form.Item name={'password'}>
                        <Input.Password placeholder={'Пароль'} />
                    </Form.Item>
                    <Button htmlType={'submit'} type={'primary'}>
                        Войти
                    </Button>
                </Form>
            </div>
        </div>
    );
};
