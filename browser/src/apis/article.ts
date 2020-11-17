import axios from '@/util/axios';

export async function list (): Promise<ApiReturn> {
    return axios.get('article/list');
}

export async function get (id: number): Promise<ApiReturn> {
    return axios.get('article', {
        params: {
            id
        }
    });
}
