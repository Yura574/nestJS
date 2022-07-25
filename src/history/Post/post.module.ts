import {Module} from "@nestjs/common";
import {PostController} from "./post.controller";
import {PostService} from "./post.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "../../Files/file.module";
import {Post, User} from "../../Entitys";


@Module({
    controllers:[PostController],
    providers:[PostService],
    imports:[TypeOrmModule.forFeature([User,  Post]), FileModule]
})

export class PostModule{}