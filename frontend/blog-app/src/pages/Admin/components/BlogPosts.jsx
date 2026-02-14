import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import {LuGalleryVerticalEnd,LuLoaderCircle,LuPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPaths'
import toast from 'react-hot-toast'
import moment from 'moment'
import Modal from '../../../components/Modal'

const BlogPosts = () => {

  cosnt [tabs,setTabs]=useState([])
  const [filterStatus,setFilterStatus]=useState("All")
  const [blogPostList,setBlogPostList]=useState([])
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null,
  })

  const getAllPosts=async (pageNumber=1)=>{

  }

  const deletePost=async (postId)=>{

  }

  const handleLoadMore=()=>{

  }

  useEffect(()=>{
    getAllPosts(1);

    return ()=>{}
  },[filterStatus])

  return (
    <DashboardLayout activeMenu="Blog Posts">
      BlogPosts
    </DashboardLayout>
  )
}

export default BlogPosts
