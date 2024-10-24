import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const salt = '$2b$10$abcdefghijklmnopqrstuv';
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
