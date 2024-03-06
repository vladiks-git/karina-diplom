import React, { useEffect } from 'react';
import { ContentHeader } from '../../ContentHeader/ContentHeader';
import { ContentWrapper } from '../../ContentWrapper/ContentWrapper';
import { Button, Checkbox, DatePicker, Divider, Form, Select } from 'antd';
import { Input } from 'antd/lib';
import TextArea from 'antd/es/input/TextArea';

import './style.scss';
import { useNavigate, useParams } from 'react-router';
import { employerRoutes } from '../../../consts/routes';
import { useGetProjectByIdQuery } from '../../../api/employerApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { ITask } from '../../../types/task';
import dayjs from 'dayjs';
import { useForm } from 'antd/es/form/Form';
import {
    useGetAllCounterpartiesQuery,
    useGetAllEmployersQuery,
    useUpdateProjectMutation,
} from '../../../api/projectManager';
import { getFormattedDate } from '../../../utils/common';
import { IProject } from '../../../types/project';
import { toast } from 'react-toastify';

const mapTasks = (tasks: ITask[]) =>
    tasks.map((task) => ({ ...task, endDate: dayjs(task.endDate) }));

export const EmployerProjectEdit = () => {
    const { id: paramsId } = useParams();
    const navigate = useNavigate();
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

    const { projectById } = useGetProjectByIdQuery(
        paramsId ? +paramsId : skipToken,
        {
            selectFromResult: ({ data }) => ({
                projectById: {
                    name: data?.name || '',
                    status: data?.status || undefined,
                    employerId: data?.employerId || undefined,
                    counterpartyId: data?.counterpartyId || undefined,
                    tasks: data?.tasks ? mapTasks(data?.tasks) : [],
                },
            }),

            refetchOnMountOrArgChange: true,
        }
    );

    const [updateProject, { isSuccess: isSuccessUpdate }] =
        useUpdateProjectMutation();

    useEffect(() => {
        form.setFieldsValue({ ...projectById });
    }, [projectById]);

    useEffect(() => {
        if (isSuccessUpdate) {
            toast.success('Успешно обновлено!');
            navigate(`/${employerRoutes.root}`);
        }
    }, [isSuccessUpdate]);

    const handleBack = () => navigate(`/${employerRoutes.root}`);

    const handleFinish = (values: any) => {
        const mappedTasks = values.tasks.map((task: any) => ({
            ...task,
            endDate: getFormattedDate(task.endDate),
        }));
        const body: IProject = { ...values, tasks: mappedTasks };
        if (paramsId) {
            updateProject({
                ...body,
                id: +paramsId,
            });
        }
    };

    return (
        <>
            <ContentHeader title={projectById.name} onBack={handleBack} />
            <ContentWrapper>
                <div className="project-edit">
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={handleFinish}
                    >
                        <Form.Item name={'name'} label={'Название проекта'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label={'Контрагент'} name={'counterpartyId'}>
                            <Select
                                disabled
                                placeholder={'Контрагент'}
                                options={counterpartiesOptions}
                            />
                        </Form.Item>
                        <Form.Item name={'status'} label={'Статус'}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name={'employerId'} label={'Назначен'}>
                            <Select
                                disabled
                                placeholder={'Назначен сотруднику'}
                                options={employerOptions}
                            />
                        </Form.Item>
                        <Form.List name={'tasks'}>
                            {(fields) => (
                                <>
                                    <Form.Item colon={false} label={' '}>
                                        Задачи
                                    </Form.Item>
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                label={'Название задачи'}
                                            >
                                                <Input
                                                    disabled
                                                    placeholder={
                                                        'Название задачи'
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={'Описание задачи'}
                                                name={[
                                                    field.name,
                                                    'description',
                                                ]}
                                            >
                                                <TextArea
                                                    disabled
                                                    placeholder={
                                                        'Описание задачи'
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={'Дата окончания'}
                                                name={[field.name, 'endDate']}
                                            >
                                                <DatePicker
                                                    disabled
                                                    placeholder={
                                                        'Дата окончания'
                                                    }
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label={'Выполнено'}
                                                name={[field.name, 'isDone']}
                                                valuePropName="checked"
                                            >
                                                <Checkbox />
                                            </Form.Item>
                                            <Divider />
                                        </div>
                                    ))}
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
