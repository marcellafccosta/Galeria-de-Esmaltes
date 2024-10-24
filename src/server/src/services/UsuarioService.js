import { prismaClient } from "../database/prismaClient.js";

export class UsuarioService {

    async createUser(userData) {
        try {
            if (!userData.nomeusuario || !userData.email || !userData.senha) {
                throw new Error("Dados de usuário incompletos. Certifique-se de que nome, email e senha estão preenchidos.");
            }

            const usuario = await prismaClient.usuario.create({
                data: {
                    nomeusuario: userData.nomeusuario,
                    email: userData.email,
                    senha: userData.senha
                }
            });

            return usuario;
        } catch (error) {
            throw new Error("Erro ao cadastrar usuário: " + error.message);
        }
    }


    async updateUser(userId, userData) {
        try {
            const usuarioAtualizado = await prismaClient.usuario.update({
                where: {
                    id: parseInt(userId)
                },
                data: {
                    nomeusuario: userData.nomeusuario,
                    email: userData.email,
                    senha: userData.senha
                }
            });
            return usuarioAtualizado;
        } catch (error) {
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    }


    async deleteUser(id) {
        try {
            const usuarioDeletado = await prismaClient.usuario.delete({
                where: {
                    id: parseInt(id)
                },
            });
            if (!usuarioDeletado) throw new Error("Usuário não encontrado");
            return usuarioDeletado;
        } catch (error) {
            throw new Error("Erro ao deletar usuário: " + error.message);
        }
    }


    async getAll() {
        try {
            const usuarios = await prismaClient.usuario.findMany();
            return usuarios;
        } catch (error) {
            throw new Error("Erro ao buscar todos os usuários: " + error.message);
        }
    }

    async getById(id) {
        try {
            const usuario = await prismaClient.usuario.findUnique({
                where: {
                    id: parseInt(id)
                },
            });
            if (!usuario) throw new Error("Usuário não encontrado");
            return usuario;
        } catch (error) {
            throw new Error("Erro ao buscar usuário pelo ID: " + error.message);
        }
    }
}

export default new UsuarioService();