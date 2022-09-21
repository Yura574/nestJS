import {BadRequestException, ForbiddenException} from "@nestjs/common";


export function isExist (items, title, nameError: string){
    const exist = items.filter(items=> items.title === title)
    if (exist.length > 0) {
        const error = new ForbiddenException(BadRequestException, `such ${nameError} already exist`)
        return {error}
    }
}