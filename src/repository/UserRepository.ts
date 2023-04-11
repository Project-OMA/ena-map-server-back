import { PrismaClient, Prisma, tb_usuario } from '@prisma/client'
import User from '../entities/User';

class UserRepository {
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    async findAll(): Promise<tb_usuario[]>{
        return await this.prisma.tb_usuario.findMany();
    }

    async findById(id: number): Promise<tb_usuario | null>{
        return await this.prisma.tb_usuario.findUnique({where: {id_usuario: id}});
    }
}

export default UserRepository;