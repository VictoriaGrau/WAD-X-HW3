const API_URL = 'http://localhost:3000';

async function request(endpoint, options = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    
    if (!res.ok) {
        const error = await res.json();
        throw { response: { status: res.status, data: error } };
    }
    
    return res.json();
}

export const signup = (email, password) => 
    request('/signup', { method: 'POST', body: JSON.stringify({ email, password }) });

export const login = (email, password) => 
    request('/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const getPosts = () => 
    request('/posts');

export const addPost = (content, image = null) => 
    request('/posts', { method: 'POST', body: JSON.stringify({ content, image }) });

export const likePost = (postId) => 
    request(`/posts/${postId}/like`, { method: 'POST' });

export const updatePost = (postId, content) => 
    request(`/posts/${postId}`, { method: 'PUT', body: JSON.stringify({ content }) });

export const deletePost = (postId) => 
    request(`/posts/${postId}`, { method: 'DELETE' });

export const clearPostLikes = (postId) => 
    request(`/posts/${postId}/clear-likes`, { method: 'POST' });
