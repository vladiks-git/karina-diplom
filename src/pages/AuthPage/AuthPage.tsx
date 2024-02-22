import React from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import './style.scss';
export const AuthPage = () => {
    const [form] = useForm();

    const handleFinish = (values: any) => {
        console.log(values);
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
