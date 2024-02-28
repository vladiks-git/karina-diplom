export const KEY_AUTH = 'key_auth';

export enum Roles {
    ADMIN = 'Администратор',
    COUNTERPARTY = 'Контрагент',
    PROJECT_MANAGER = 'Проектный менеджер',
    EMPLOYER = 'Сотрудник',
}

export const rolesOptions = [
    {
        value: Roles.COUNTERPARTY,
        label: Roles.COUNTERPARTY,
    },
    {
        value: Roles.PROJECT_MANAGER,
        label: Roles.PROJECT_MANAGER,
    },
    {
        value: Roles.EMPLOYER,
        label: Roles.EMPLOYER,
    },
];

export enum ProjectStatuses {
    ASSIGNED = 'Назначена',
    SOLVED = 'Решена',
    CLOSED = 'Закрыта',
    IN_WORK = 'В работе',
}

export const projectStatusesOptions = [
    {
        value: ProjectStatuses.ASSIGNED,
        label: ProjectStatuses.ASSIGNED,
    },
    {
        value: ProjectStatuses.SOLVED,
        label: ProjectStatuses.SOLVED,
    },
    {
        value: ProjectStatuses.CLOSED,
        label: ProjectStatuses.CLOSED,
    },
    {
        value: ProjectStatuses.IN_WORK,
        label: ProjectStatuses.IN_WORK,
    },
];
