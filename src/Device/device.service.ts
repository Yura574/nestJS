import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Device} from "../Entitys";
import {Repository} from "typeorm";
import {DeviceDto} from "../Entitys/dto/deviceDto";
import {FileService} from "../Files/file.service";


@Injectable()

export class DeviceService {
    constructor(@InjectRepository(Device) private deviceRepository:  Repository<Device>,
                private fileService: FileService) {
    }
   async createDevice (dto: DeviceDto, file: Express.Multer.File){
       const fileName = await this.fileService.createFile(file)
       const device = await this.deviceRepository.save({...dto, img: fileName})
       console.log(fileName)
       console.log(file)
        return {...dto, img: fileName}
    }
    // async create (dto: CreatePostDto, image: any){
    //     console.log(image)
    //     console.log(dto)
    //     const fileName = await this.fileService.createFile(image)
    //     const post = await this.postRepository.save({...dto, image: fileName})
    //     return post
    // }

    getAllDevices(){
        return this.deviceRepository.find()
    }

    getOneDevice(id: string){
        return this.deviceRepository.findOneBy({id: Number(id)})
    }
}