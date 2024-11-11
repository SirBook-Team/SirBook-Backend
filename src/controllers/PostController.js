import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { hash } from 'bcrypt';
import { hashPassword } from '../utils/utilsUser.js';
import dotenv from 'dotenv';

dotenv.config();

class PostController {
    async create(req, res) {
        const data = {
            content: req.body.content,
            owner: req.user.email,
            image: req.image,
            comments_ids: [],
            profiles_reacted_ids: [],
            timestamp: new Date().toISOString()
        }
        if (!req.image) {
            throw new Error('Image not found');
        }
        const post = await Post.createObject(data);
        if (!post) {
            throw new Error('Post not created');
        }
        await post.retrive();
   
        res.status(200).json(post);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        const post = await Post.getById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.owner !== req.user.email && 0) {
            throw new Error('Unauthorized');
        }
        await post.delete();
        res.status(200).send('Post deleted');
    }

    async getAll(req, res) {
        const posts = await Post.findAll();
        for (const post of posts) {
            await post.retrive();
        }
        res.status(200).json(posts);
    }

    async getOwn(req, res) {
        const email = req.params.email;
        const posts = await Post.findAll({ owner: email });
        for (const post of posts) {
            await post.retrive();
        }
        res.status(200).json(posts);
    }

    async react(req, res) {
        const id = req.params.id;
        const email = req.user.email;
        const post = await Post.getById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        // remove reaction if already reacted by user
        if (post.profiles_reacted_ids.includes(email)) {
            post.profiles_reacted_ids = post.profiles_reacted_ids.filter(e => e !== email);
        }
        else {
            post.profiles_reacted_ids.push(email);
        }
            
        await post.update();
        return res.status(200).send('Reacted');
    }

    async comment(req, res) {
        const id = req.params.id;
        const post = await Post.getById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        const comment = await Comment.createObject({
            content: req.body.content,
            owner: req.user.email,
            post_id: id,
            timestamp: new Date().toISOString()
        });
        post.comments_ids.push(comment.id);
        await post.update();
        res.status(200).json(comment);
    }

    async deleteComment(req, res) {
        const id = req.params.id;
        const comment = await Comment.getById(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        await comment.delete();
        res.status(200).send('Comment deleted');
    }
}

const postController = new PostController();
export default postController;
