import {Module} from "@nestjs/common";
import {PostController} from "./post.controller";
import {PostService} from "./post.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../Entity/user.entity";
import {Post} from "../Entity/post.entity";
import {FileModule} from "../Files/file.module";


@Module({
    controllers:[PostController],
    providers:[PostService],
    imports:[TypeOrmModule.forFeature([User,  Post]), FileModule]
})

export class PostModule{}