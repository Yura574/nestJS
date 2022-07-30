import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "../Entitys";


@Injectable()

export class TestService {
    constructor(@InjectRepository(Post)
                private testRepository: Repository<Post>,
    ) {    }

}