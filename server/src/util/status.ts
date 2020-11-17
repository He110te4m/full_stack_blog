import { isEmpty } from 'lodash';

export enum CodeStatus {
    SUCCESS = 0,
    AUTHENTICATION_FAILED,
    UNAUTHORIZED
}

export const ERROR_STATUS = {
    [ CodeStatus.SUCCESS ]: '成功',
    [ CodeStatus.AUTHENTICATION_FAILED ]: '鉴权失败，请重新验证密钥',
    [ CodeStatus.UNAUTHORIZED ]: '当前登录凭证已失效，请先登录'
};

export function generateApiReturn (code: CodeStatus, data: AnyObject = {}): ApiReturn {
    return Object.assign({
        code,
        msg: ERROR_STATUS[code]
    }, isEmpty(data) ? {} : {
        data
    });
}
