import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FileService{

    async createFile(file): Promise<string>{
        try{
            console.log(file)
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            // console.log(filePath)
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return "http://localhost:5000/" + fileName
        }
        catch (err){
            console.log(err)
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}