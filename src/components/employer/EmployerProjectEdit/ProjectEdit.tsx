import React from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import {
    Button,
    Checkbox,
    DatePicker,
    DescriptionsProps,
    Divider,
    Form,
} from 'antd';
import { Input } from 'antd/lib';
import TextArea from 'antd/es/input/TextArea';

import './style.scss';
import { useNavigate } from 'react-router';
import { employerRoutes } from '../../../consts/routes';

export const EmployerProjectEdit = () => {
    const navigate = useNavigate();

    const handleBack = () => navigate(`/${employerRoutes.root}`);

    return (
        <>
            <ContentHeader title={'твой тай'} onBack={handleBack} />
            <ContentWrapper>
                <div className="project-edit">
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <Form.Item label={'Название проекта'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={'Контрагент'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={'Статус'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={'Назначен'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.List name={'tasks'}>
                            {(fields) => (
                                <>
                                    <div
                                        className={`project-edit__task-wrapper`}
                                    >
                                        Задачи
                                        {fields.map((field) => (
                                            <div
                                                className={
                                                    'create-project__task'
                                                }
                                                key={field.key}
                                            >
                                                <Form.Item name={'taskName'}>
                                                    <Input
                                                        disabled
                                                        placeholder={
                                                            'Название задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={'taskDescription'}
                                                >
                                                    <TextArea
                                                        disabled
                                                        placeholder={
                                                            'Описание задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item name={'taskEndDate'}>
                                                    <DatePicker
                                                        disabled
                                                        placeholder={
                                                            'Дата окончания'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item name={'isDone'}>
                                                    Выполнено {'  '}
                                                    <Checkbox />
                                                </Form.Item>
                                                <Divider />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </Form.List>
                        <Button htmlType={'submit'} type={'primary'}>
                            Сохранить
                        </Button>
                    </Form>
                </div>
            </ContentWrapper>
        </>
    );
};
