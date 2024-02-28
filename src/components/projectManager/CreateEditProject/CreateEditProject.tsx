import React, { useEffect } from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Button, DatePicker, Divider, Form, Input, Select } from 'antd';

import './style.scss';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router';
import { projectManagerRoutes } from '../../../consts/routes';
import { projectStatusesOptions } from '../../../consts/common';
import {
    useGetAllCounterpartiesQuery,
    useGetAllEmployersQuery,
    useGetProjectByIdQuery,
    useSaveProjectMutation,
} from '../../../api/projectManager';
import { getFormattedDate } from '../../../utils/common';
import { toast } from 'react-toastify';
import { IProject } from '../../../types/project';
import { skipToken } from '@reduxjs/toolkit/query';
import { ITask } from '../../../types/task';
import dayjs from 'dayjs';

const mapTasks = (tasks: ITask[]) =>
    tasks.map((task) => ({ ...task, endDate: dayjs(task.endDate) }));

const CreateEditProject = () => {
    const navigate = useNavigate();
    const { id: paramsId } = useParams();

    const [form] = useForm();

    const { employerOptions } = useGetAllEmployersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            employerOptions:
                data?.map((user) => ({
                    label: user.username,
                    value: user.id,
                })) || [],
        }),
    });
    const { counterpartiesOptions } = useGetAllCounterpartiesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            counterpartiesOptions:
                data?.map((user) => ({
                    label: user.username,
                    value: user.id,
                })) || [],
        }),
    });

    const [saveProject, { isSuccess: isSuccessCreate }] =
        useSaveProjectMutation();

    const { projectById } = useGetProjectByIdQuery(
        paramsId ? +paramsId : skipToken,
        {
            selectFromResult: ({ data }) => ({
                projectById: {
                    name: data?.name || '',
                    status: data?.status || undefined,
                    employerId: data?.employerId || undefined,
                    counterpartyId: data?.counterparty || undefined,
                    tasks: data?.tasks ? mapTasks(data?.tasks) : [],
                },
            }),
        }
    );

    console.log(projectById);

    useEffect(() => {
        form.setFieldsValue({ ...projectById });
    }, [projectById]);

    useEffect(() => {
        if (isSuccessCreate) {
            toast.success('Проект успешно создан!');
            handleBack();
        }
    }, [isSuccessCreate]);

    const handleFinish = (values: any) => {
        const mappedTasks = values.tasks.map((task: any) => ({
            ...task,
            endDate: getFormattedDate(task.endDate),
            isDone: false,
        }));
        const body: IProject = { ...values, tasks: mappedTasks };
        saveProject(body);
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
                    <Form
                        initialValues={projectById}
                        form={form}
                        onFinish={handleFinish}
                    >
                        <div className={'create-project__form-inner'}>
                            <div className="create-project__col">
                                <Form.Item name={'name'}>
                                    <Input placeholder={'Название проекта'} />
                                </Form.Item>
                                <Form.Item name={'status'}>
                                    <Select
                                        placeholder={'Статус'}
                                        options={projectStatusesOptions}
                                    />
                                </Form.Item>
                            </div>
                            <div className="create-project__col">
                                <Form.Item name={'employerId'}>
                                    <Select
                                        placeholder={'Назначен сотруднику'}
                                        options={employerOptions}
                                    />
                                </Form.Item>
                                <Form.Item name={'counterpartyId'}>
                                    <Select
                                        placeholder={'Контрагент'}
                                        options={counterpartiesOptions}
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
                                                <Form.Item
                                                    name={[field.name, 'name']}
                                                >
                                                    <Input
                                                        placeholder={
                                                            'Название задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[
                                                        field.name,
                                                        'description',
                                                    ]}
                                                >
                                                    <TextArea
                                                        placeholder={
                                                            'Описание задачи'
                                                        }
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[
                                                        field.name,
                                                        'endDate',
                                                    ]}
                                                >
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
