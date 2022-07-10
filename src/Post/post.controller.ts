import {Body, Controller, Get, Post, UploadedFile   , UseInterceptors} from "@nestjs/common";
import {CreatePostDto} from "../dto/createPost.dto";
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
        return 'this.postService.createPost(dto)'
    }
    @Get()
    get(){
        return 'lololo'
    }
}