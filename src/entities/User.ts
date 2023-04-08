export default class User {
    id_usuario: Number;
    no_usuario: string;
    email: string;
    password: string;
    type: Number;
    created_at: Date;
    updated_at: Date;

    constructor(
        id_usuario: Number,
        no_usuario: string,
        email: string,
        password: string,
        type: Number,
        created_at: Date,
        updated_at: Date
    ){
        this.id_usuario = id_usuario;
        this.no_usuario = no_usuario;
        this.email = email;
        this.password = password;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}