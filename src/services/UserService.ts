import UserRepository from "../repository/UserRepository";
import AppError from "../errors/AppError";

class UserService{
    userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    async findAll(){
        return (await this.userRepository.findAll()).map(user => ({...user, id_usuario: parseInt(user.id_usuario.toString()), type: parseInt(user.type.toString())}));
    }

    async findById(id: number){
        const user : any = await this.userRepository.findById(id);
        if(!user && !user.id_usuario){
            throw new AppError(404, "User not found");
        }
        user.id_usuario = parseInt(id.toString());
        user.type = parseInt(user.type.toString());
        return user;
    }
}

export default new UserService();