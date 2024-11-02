// models/User.js
import BaseModel from './BaseModel';
import User from './User';
import Comment from './Comment';

class Post extends BaseModel {
    static name = 'posts';
    async retrive() {
        this.owner = await User.findOne({ email: this.owner });
        await this.owner.retrive();
        this.comments = [];
        for (const id of this.comments_ids) {
            if (!id) continue;
            try {
                const comment = await Comment.getById(id);
                if (!comment) {
                    continue;
                }
                await comment.retrive();
                this.comments.push(comment);
            } catch (error) {
                continue;
            }
        }
        this.reacts = [];
        for (const email of this.profiles_reacted_ids) {
            const user = await User.findOne({ email });
            await user.retrive();
            this.reacts.push(user);
        }

        this.image = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/files/image/${this.image}`;
        delete this.comments_ids;
        delete this.profiles_reacted_ids;
    }
}

export default Post;
