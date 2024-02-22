import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import './style.scss';
import { Card } from '../../../ui-kit/Card/Card';
import { useForm } from 'antd/es/form/Form';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { useNavigate } from 'react-router';
import { adminRoutes } from '../../../consts/routes';

const CreateEditUser = () => {
    const [form] = useForm();

    const navigate = useNavigate();

    const handleFinish = (values: any) => {
        console.log(values);
    };

    const handleBack = () => navigate(`/${adminRoutes.root}`);

    return (
        <>
            <ContentHeader title={'Создание новой учетной записи'} />
            <ContentWrapper>
                <Card>
                    <div className={'create-user'}>
                        <div className="create-user__title">
                            Введите данные для создания нового пользователя
                        </div>
                        <Form form={form} onFinish={handleFinish}>
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
