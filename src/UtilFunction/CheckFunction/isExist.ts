import {BadRequestException, ForbiddenException} from "@nestjs/common";


export const isExist =async (id, path, title) => {
    const el = await path(id)
    if(!el){
        throw new ForbiddenException(BadRequestException, `${title} not found`)
    }
    return true
}