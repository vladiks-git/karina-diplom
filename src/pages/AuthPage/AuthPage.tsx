import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import './style.scss';
import { useAuthMutation } from '../../api/authApi';
import { useNavigate } from 'react-router';
import { KEY_AUTH, Roles } from '../../consts/common';
import {
    adminRoutes,
    counterpartyRoutes,
    employerRoutes,
    projectManagerRoutes,
} from '../../consts/routes';
export const AuthPage = () => {
    const navigate = useNavigate();
    const [login, { data, isSuccess, error }] = useAuthMutation({
        fixedCacheKey: KEY_AUTH,
    });

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

    const isAuthError = (error: any): boolean => error?.status === 401;

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
                    {isAuthError(error) && (
                        <p className={'auth-page__error'}>
                            Неверный логин или пароль
                        </p>
                    )}

                    <Button htmlType={'submit'} type={'primary'}>
                        Войти
                    </Button>
                </Form>
            </div>
        </div>
    );
};
