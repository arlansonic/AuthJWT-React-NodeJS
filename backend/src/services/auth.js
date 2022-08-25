
import bcrypt from 'bcrypt'

export const createPasswordHash = async (password) => {
    // Criando Criptografia para Senha 
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword
}