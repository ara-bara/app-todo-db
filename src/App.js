import React, { useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import RegisterForm from "./components/AuthPage";

function App() {
  const [posts, setPosts] = useState([
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <RegisterForm />
      <PostForm create={createPost} />
      {posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title="Task listk" />
        : <h1 style={{ textAlign: 'center' }}>
          No tasks
        </h1>
      }
    </div>
  )
}

export default App;
