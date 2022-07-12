import {Module} from "@nestjs/common";
import {PostController} from "./post.controller";
import {PostService} from "./post.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entitys/user.entity";
import {Post} from "../Entitys/post.entity";
import {FileModule} from "../Files/file.module";


@Module({
    controllers:[PostController],
    providers:[PostService],
    imports:[TypeOrmModule.forFeature([User,  Post]), FileModule]
})

export class PostModule{}