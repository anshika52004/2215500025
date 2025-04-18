import React, { useEffect, useState } from 'react';
import './Feed.css';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                const transformedPosts = data.slice(0, 10).map((post, index) => ({
                    id: post.id,
                    username: `User${index + 1}`,
                    avatar: 'https://via.placeholder.com/50',
                    timestamp: `${index + 1} hours ago`,
                    content: post.body,
                }));
                setPosts(transformedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="feed-container"><h1>Loading...</h1></div>;
    }

    return (
        <div className="feed-container">
            <h1>Feed</h1>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <img src={post.avatar} alt={`${post.username}'s avatar`} className="avatar" />
                            <div>
                                <h3 className="username">{post.username}</h3>
                                <p className="timestamp">{post.timestamp}</p>
                            </div>
                        </div>
                        <p className="content">{post.content}</p>
                        <div className="post-actions">
                            <button className="like-button">Like</button>
                            <button className="comment-button">Comment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;