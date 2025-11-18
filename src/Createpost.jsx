import React from 'react'
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"



const initialPost ={
    title: '',
    description: '',
    picture: '',
    category: '',
    createDate: new Date()
}
const Createpost = () => {
    const[post, setPost] = useState(initialPost)
    const[file, setFile] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const category = location?.search?.split('=')[1] || 'All';
        setPost((prev) => ({ ...prev, category: category}));
    },[location])

    const handlechange = (e) =>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", post.title)
        formData.append("description", post.description)
        formData.append("category", post.category)
        if(file) {
            formData.append("file", file)
        }
        try{
            const res = await axios.post("http://localhost:5000/createpost", formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("saved post", res.data)
            alert("Post created successfully")
            setPost(initialPost)
            setFile(null)
            navigate("/Home")
        }
        catch(err){
            console.log(err)
            alert("Error creating Post")
        }
    }


  return (
    <div className='box'>
      <img src={file ? URL.createObjectURL(file) : "/blog.jpg" } alt='preview' />
      <form onSubmit={handleSubmit}>
        <label htmlFor='fileinput'>
            <i className="bi bi-plus-circle-fill "></i>
        </label>
        <input 
        type="file" 
        id='fileinput' 
        onChange={
            (e) => setFile(e.target.files[0])
        }/>
        <InputBase 
        className='Title' 
        placeholder='Title'  
        name='title' 
        value={post.title}
        onChange={
            handlechange
        }/>
        <button 
        type="submit"
        className='btn btn-primary'
        >
            PUBLISH
        </button>
      </form>
      <textarea 
      minLength={5} 
      placeholder='Tell your Story....'  
      name='description' 
      value={post.description}
      onChange={
        handlechange
        }>

        </textarea>
    </div>
  )
}

export default Createpost
