import { pbkdf2Sync } from 'pbkdf2';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { People } from '../models';
const secret = process.env.JWT_SECRET || 'my@#$secret';

export async function login(email, password) {
    const user = await People.findOne({ where: { email } });
    let token = null;
    if (user && comparePassword(user.password, password)) {
        delete user.password;
        token = {
            token: sign({
                id: user.id,
                name: user.name,
                color: user.color,
            }, secret, { expiresIn: '24h' }),
        };
    }
    return token;
}

export function hashPassword(password: string) {
    const salt = v4().replace(/-/g, '').substring(0, 16);
    const pwHash = pbkdf2Sync(password, salt, 1000, 20, 'sha512').toString('hex');
    return `pbkdf2(1000,20,sha512)$${salt}$${pwHash}`;
}

function comparePassword(storedPassword: string, submittedPassword: string): boolean {
    const members: string[] = storedPassword.split('$');
    if (members && members.length === 3) {
        const pbkdf2Ssetting = members[0].match(/pbkdf2\((.*)\)/);

        if (pbkdf2Ssetting && pbkdf2Ssetting.length > 1) {
            const cryptSettings = pbkdf2Ssetting[1].split(',');
            const salt = members[1];
            const storedHash = members[2];
            const pwHash = pbkdf2Sync(submittedPassword,
                salt,
                parseInt(cryptSettings[0], 10),
                parseInt(cryptSettings[1], 10),
                cryptSettings[2]).toString('hex');
            return pwHash === storedHash;
        }
    }
    return false;
}
