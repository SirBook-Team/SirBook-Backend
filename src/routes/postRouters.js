import express from 'express';
import {upload} from '../utils/utilsImage.js'
import postController from '../controllers/PostController.js';

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {
        await postController.getAll(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
});

postRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        await postController.create(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
});

postRouter.post('/delete/:id', async (req, res) => {
    try {
        await postController.deletePost(req, res);
    } catch (error) {
        res.status(400).send(`Error deleting post: ${error.message}`);
    }
});

postRouter.get('/:email', async (req, res) => {
    console.log('Getting own posts');
    try {
        await postController.getOwn(req, res);
    } catch (error) {
        res.status(400).send
    }
});

postRouter.post('/react/:id', async (req, res) => {
    try {
        await postController.react(req, res);
    } catch (error) {
        res.status(400).send
    }
});

postRouter.post('/comment/:id', async (req, res) => {
    console.log('Commenting');
    try {
        await postController.comment(req, res);
    } catch (error) {
        res.status(400).send
    }
});

postRouter.post('/comment/delete/:id', async (req, res) => {
    try {
        await postController.deleteComment(req, res);
    } catch (error) {
        res.status(400).send
    }
});

export default postRouter;
