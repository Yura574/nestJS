import {Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CreatePostDto} from "../Entity/dto/createPost.dto";
import {PostService} from "./post.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Request} from "express";


@Controller('post')
export class PostController{

    constructor(private postService: PostService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor)
    createPost(@Body() dto: CreatePostDto,
               @Req() req: Request,
               @UploadedFile() image){
        console.log(req)
        console.log(image)
        console.log(dto)
        return 'this.postService.createPost(dto)'
    }
    @Get()
    get(){
        return 'lololo'
    }
}