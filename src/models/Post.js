// models/User.js
import BaseModel from './BaseModel';
import User from './User';

class Post extends BaseModel {
    static async construct(data, validate = true) {
        const post = super.construct(data, validate);
        const owner = await User.findOne({ email: post.owner });
        if (!owner) {
            throw new Error('Owner not found');
        }
        post.owner = owner;
        return post;
    }
}

export default Post;
