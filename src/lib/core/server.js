import { getUserToken } from "./sesson";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//jwt2
export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Fetch failed');
    }
    return res.json();
};

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            //jwt3
            ... await authHeader()
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Mutation failed');
    }

    return res.json();
};