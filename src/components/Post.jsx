import React, { useEffect, useState } from 'react';
import './Post.css';

const Post = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://20.244.56.144/evaluation-service/users/${userId}/posts`);
                const data = await response.json();

                
                const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    const handleNewPostSubmit = (e) => {
        e.preventDefault();

        
        const newPostData = {
            id: Date.now(), 
            title: newPost.title,
            body: newPost.body,
            createdAt: new Date().toISOString(),
        };

        setPosts([newPostData, ...posts]);
        setNewPost({ title: '', body: '' });
    };

    if (loading) {
        return <div className="post-page-container"><h1>Loading...</h1></div>;
    }

    return (
        <div className="post-page-container">
            <h1>User Posts</h1>

            {/* New Post Form */}
            <form className="new-post-form" onSubmit={handleNewPostSubmit}>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Post Body"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Add Post</button>
            </form>

            {/* Posts List */}
            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-body">{post.body}</p>
                        <p className="post-timestamp">Posted on: {new Date(post.createdAt).toLocaleString()}</p>

                        {/* Comment Section */}
                        <div className="comments">
                            <h4>Comments</h4>
                            <textarea placeholder="Add a comment"></textarea>
                            <button>Add Comment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;