import e from 'express';
import User from './src/models/User.js';


async function main() {
    const user = await User.createObject({username: 'John', password: 'Password1!', email: 'email@gma.com'});
    user.setUserName('Amr');
    user.update();
    user.delete();
    console.log(user);
    //user.setUserName('Amr');
    //user.update();
}

main();
