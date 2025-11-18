import React, { useEffect, useState } from 'react'
import { home } from './data'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/getposts")
                setPosts(res.data)
            }
            catch (err) {
                console.error("Error fetching posts:", err)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div>
            <div className="image">
                <h1>BLOG</h1>
            </div>
            <div className="boxer">
                <div className="categories">
                    <Link to={`/create?category=${category || ''}`} className='d-flex align-items-center justify-content-center flex'>
                        <button className='createblog' >Create Blog</button>
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <Link to='/create'>

                                        All Categories
                                    </Link>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                home.map(category => (
                                    <tr key={category.id}>
                                        <td>
                                            <Link to={`/create?category=${category.type}`}>
                                                {category.type}

                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="posts">
                    {posts.length === 0 ? (
                        <p>No posts yet</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <img src={post.picture} alt={post.title} width="200" />
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <small>
                                    {new Date(post.createDate).toLocaleString()}
                                </small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
