import axios from '@/util/axios';

export async function getSiteInfo (): Promise<ApiReturn> {
    return axios.get('info/site');
}
