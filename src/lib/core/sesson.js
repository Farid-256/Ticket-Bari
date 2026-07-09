// lib/core/session.js
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user || null;
}

//jwt1
export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession()
    if (user.role !== role) {
        redirect('/unauthorized')
    }
    return user
}