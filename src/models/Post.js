// models/User.js
import BaseModel from './BaseModel';
import User from './User';

class Post extends BaseModel {
    static name = 'posts';
    async retrive() {
        this.owner = await User.findOne({ email: this.owner });
        await this.owner.retrive();
        this.comments = [];
        for (const id of this.comments_ids) {
            const comment = await Comment.findOne({ _id: id });
            await comment.retrive(); 
            this.comments.push(comment);
        }
        this.image = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/files/image/${this.image}`;
        delete this.comments_ids;
    }
}

export default Post;
