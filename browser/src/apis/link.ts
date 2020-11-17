import axios from '@/util/axios';

export async function list (): Promise<ApiReturn> {
    return axios.get('info/links');
}
