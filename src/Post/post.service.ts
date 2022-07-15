import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreatePostDto} from "../Entitys/dto/createPost.dto";
import {FileService} from "../Files/file.service";
import {Post} from "../Entitys";


@Injectable()
export class PostService {
    constructor(@InjectRepository(Post)
                private postRepository: Repository<Post>,
                private fileService: FileService) {
    }

    async create (dto: CreatePostDto, image: any){
        console.log(image)
        console.log(dto)
        const fileName = await this.fileService.createFile(image)
        return await this.postRepository.save({...dto, image: fileName})
    }
}