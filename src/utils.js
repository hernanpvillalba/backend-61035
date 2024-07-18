import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));


import bcryptjs from 'bcryptjs';

export const createHash = password => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

export const isValidPassword = (password, user) =>bcryptjs.compareSync(password, user.password)


export const createResponse = (res, statusCode, data, next) =>{
        return res.status(statusCode).json(data)
}