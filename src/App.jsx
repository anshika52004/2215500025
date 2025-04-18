import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feed from './components/Feed';
import UserPage from './components/Users';
import Post from './components/Post';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div>
                        <h1>Socially</h1>
                    </div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/feed">Feed</Link></li>
                        <li><Link to="/users">Top Users</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                    </ul>
                    <div>
                      <button>Login</button>
                      <button>SignUp</button>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<h1>Welcome to Socially</h1>} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/posts" element={<Post userId={1} />} /> {/* Replace 1 with dynamic userId */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;