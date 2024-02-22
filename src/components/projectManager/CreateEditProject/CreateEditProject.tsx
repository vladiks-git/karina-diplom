import React from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Button, DatePicker, Divider, Form, Input, Select } from 'antd';

import './style.scss';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router';
import { projectManagerRoutes } from '../../../consts/routes';
const CreateEditProject = () => {
    const navigate = useNavigate();
    const [form] = useForm();

    const handleFinish = (values: any) => {
        console.log(values);
    };

    const handleBack = () => navigate(`/${projectManagerRoutes.root}`);

    return (
        <>
            <ContentHeader
                onBack={handleBack}
                title={'Создание нового проекта'}
            />
            <ContentWrapper>
                <div className={'create-project__title'}>
                    Введите данные для создания нового проекта
                </div>
                <div className="create-project__form-wrapper">
                    <Form form={form} onFinish={handleFinish}>
                        <div className={'create-project__form-inner'}>
                            <div className="create-project__col">
                                <Form.Item name={'name'}>
                                    <Input placeholder={'Название проекта'} />
                                </Form.Item>
                                <Form.Item name={'status'}>
                                    <Select
                                        placeholder={'Статус'}
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                            <div className="create-project__col">
                                <Form.Item name={'employer'}>
                                    <Select
                                        placeholder={'Назначен сотруднику'}
                                        options={[]}
                                    />
                                </Form.Item>
                                <Form.Item name={'counterparty'}>
                                    <Select
                                        placeholder={'Контрагент'}
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <p>Задачи</p>
                        <Form.List name={'tasks'}>
                            {(fields, { add, remove }) => (
                                <>
                                    <div
                                        className={
                                            'create-project__task-wrapper'
                                        }
                                    >
                                        {fields.map((field) => (
                                            <div
                                                className={
                                                    'create-project__task'
                                                }
                                                key={field.key}
                                            >
                                                <Form.Item name={'taskName'}>
                                                    <Input
                                                        placeholder={
                                                            'Название задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={'taskDescription'}
                                                >
                                                    <TextArea
                                                        placeholder={
                                                            'Описание задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item name={'taskEndDate'}>
                                                    <DatePicker
                                                        placeholder={
                                                            'Дата окончания'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                >
                                                    Удалить
                                                </Button>
                                                <Divider />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type={'primary'}
                                        onClick={() => add()}
                                        className={'create-project__add-task'}
                                    >
                                        Добавить задачу
                                    </Button>
                                </>
                            )}
                        </Form.List>
                        <div className={'create-project__btns'}>
                            <Button type={'primary'} htmlType={'submit'}>
                                Сохранить
                            </Button>
                            <Button>Отмеить</Button>
                        </div>
                    </Form>
                </div>
            </ContentWrapper>
        </>
    );
};

export default CreateEditProject;
