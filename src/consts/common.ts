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
