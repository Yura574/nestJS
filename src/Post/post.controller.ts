import {Body, Controller, Get, Post,  UploadedFile, UseInterceptors} from "@nestjs/common";
import {CreatePostDto} from "../Entitys/dto/createPost.dto";
import {PostService} from "./post.service";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('post')
export class PostController{

    constructor(private postService: PostService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor)
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image){
        console.log(image)
        console.log(dto)
        const folder = 'static'
        return this.postService.create(dto, image, folder)
    }
    @Get()
    get(){
        return 'lololo'
    }
}