// models/User.js
import BaseModel from './BaseModel';
import User from './User';

class Comment extends BaseModel {
    static name = 'comments';
    async retrive() {
        this.owner = await User.findOne({ email: this.owner });
        await this.owner.retrive();
    }
}

export default Comment;
