'use server';

import { protectedFetch, serverMutation } from '../core/server';


export const getAllUsers = async () => {
    return protectedFetch('/api/users');
};


export const updateUserRole = async (userId, role) => {
    return serverMutation(`/api/users/${userId}/role`, { role }, 'PUT');
};


export const markUserAsFraud = async (userId) => {
    return serverMutation(`/api/users/${userId}/fraud`, {}, 'PUT');
};