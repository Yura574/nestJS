import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "../Entity/post.entity";
import {Repository} from "typeorm";
import {CreatePostDto} from "../Entity/dto/createPost.dto";
import {FileService} from "../Files/file.service";

interface PostInterface {
    title: string,
    content: string,
    image: string
}

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post)
                private postRepository: Repository<Post>,
                private fileService: FileService) {
    }

    async createPost (dto){
        // console.log(image)
        // const fileName = await this.fileService.createFile(image)
        // const post = await this.postRepository.save({...dto, image: fileName})
        return dto
    }
}