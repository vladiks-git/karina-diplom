import React from 'react';
import { ContentHeader } from '../../components/ContentHeader/ContentHeader';
import { ContentWrapper } from '../../components/ContentWrapper/ContentWrapper';
import { Card } from '../../ui-kit/Card/Card';
import { Timeline } from 'antd';

import './style.scss';
import { useAuthMutation } from '../../api/authApi';
import { KEY_AUTH } from '../../consts/common';
import { useGetTasksQuery } from '../../api/counterpartyApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { ITask } from '../../types/task';

export const СounterpartyPage = () => {
    const [login, { data }] = useAuthMutation({
        fixedCacheKey: KEY_AUTH,
    });

    const userId = data?.id;

    const { data: projects = [] } = useGetTasksQuery(
        userId ? userId : skipToken,
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const getTimelineItem = (tasks: ITask[]) =>
        tasks.map((task) => ({
            label: task.endDate,
            color: task.isDone ? 'green' : 'blue',
            children: (
                <div className={'counterparty__timeline-item'}>
                    <p>{task.name}</p>
                    <p>{task.description}</p>
                </div>
            ),
        }));

    return (
        <>
            <ContentHeader title={'Список проектов'} />
            <ContentWrapper>
                <Card>
                    {projects.map((project) => (
                        <>
                            <p>
                                Отслеживание реализации проекта - {project.name}
                            </p>
                            <div className={'counterparty__timeline-wrapper'}>
                                <Timeline
                                    mode={'left'}
                                    items={getTimelineItem(project.tasks)}
                                />
                            </div>
                        </>
                    ))}
                </Card>
            </ContentWrapper>
        </>
    );
};
