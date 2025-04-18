import React, { useEffect, useState } from 'react';
import './Users.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsersWithComments = async () => {
            try {
            
                const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
                const posts = await postsResponse.json();
                const comments = await commentsResponse.json();

                
                const userCommentCount = {};
                comments.forEach((comment) => {
                    const post = posts.find((p) => p.id === comment.postId);
                    if (post) {
                        userCommentCount[post.userId] = (userCommentCount[post.userId] || 0) + 1;
                    }
                });

                
                const sortedUsers = Object.entries(userCommentCount)
                    .map(([userId, commentCount]) => ({
                        userId,
                        commentCount,
                        username: `User${userId}`, 
                        avatar: 'https://via.placeholder.com/50', 
                    }))
                    .sort((a, b) => b.commentCount - a.commentCount)
                    .slice(0, 5); 

                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersWithComments();
    }, []);

    if (loading) {
        return <div className="user-page-container"><h1>Loading...</h1></div>;
    }

    return (
        <div className="user-page-container">
            <h1>Top 5 Users with Maximum Comments</h1>
            <div className="users">
                {users.map((user) => (
                    <div key={user.userId} className="user-card">
                        <img src={user.avatar} alt={`${user.username}'s avatar`} className="avatar" />
                        <div>
                            <h3 className="username">{user.username}</h3>
                            <p className="comment-count">Comments: {user.commentCount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;