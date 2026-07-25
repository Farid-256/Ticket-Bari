'use server';

import { serverFetch, serverMutation } from '../core/server';


export const getAllUsers = async () => {
    return serverFetch('/api/users');
};


export const updateUserRole = async (userId, role) => {
    return serverMutation(`/api/users/${userId}/role`, { role }, 'PUT');
};


export const markUserAsFraud = async (userId) => {
    return serverMutation(`/api/users/${userId}/fraud`, {}, 'PUT');
};