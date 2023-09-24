import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    body: String,
    createdAt: String,
});

const Post = mongoose.models.Post
    ? mongoose.models.Post
    : mongoose.model('Post', postSchema);

export default Post;