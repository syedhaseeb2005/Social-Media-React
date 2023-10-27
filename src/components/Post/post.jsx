import './post.css'
import {MoreVert} from  '@mui/icons-material'
// import PostImg from '../assets/Person/lamp-post-4420668_640.jpg'
import LikeImg from '../assets/Person/download__4_-removebg-preview.png'
import HeartImg from '../assets/Person/download__1_-removebg-preview.png'
// import { User } from '../../dummydata'
import profileImage from '../assets/Person/download (1).png';
import axios from 'axios'
import { useState , useEffect, useContext } from 'react'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext';
function Post({post}) {
    // console.log(post);
      const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //   console.log(post?.img || PF + post?.img);
   const [like,setlike] = useState(post.likes.length)
   const [isliked,setisliked] = useState(false)
   const [User,setUser] = useState({})
    const {user:currentuser} = useContext(Authcontext)

   useEffect(()=>{
    setisliked(post.likes.includes(currentuser?._id))
   },[currentuser?._id , post.likes])
   useEffect(()=>{
    const FetchUsers = async ()=>{
        try {
         const res = await axios.get(`http://localhost:5500/api/user?userId=${post?.userId}`);
        // const datas = res.json();
        setUser(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    FetchUsers()
},[post?.userId])


    const LikeHanlder = async ()=>{
        try {
          await axios.put('http://localhost:5500/api/post/'+ post._id+'/like',{userId:currentuser._id})
        } catch (error) {
            console.log(error);
        }

        setlike(isliked ? like - 1 : like + 1)
        setisliked(!isliked)
    }
    
   return (
        <div className='post'>
            <div className="posWrapper">
                <div className="PostTop">
                    <div className="PostTopLeft">
      
                        <Link to={`profile/${User.username}`}>
                        <img className='postprofileImg' src={User?.profilepic ? PF + User?.profilepic :  profileImage} alt="postprofileImg" />
                        </Link>
      
                        <span className="postUsername">{User.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="PostTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="PostCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post?.img || 'https://img.freepik.com/free-vector/gamer-playing-with-computer_52683-16730.jpg?size=626&ext=jpg&uid=R119851894&ga=GA1.2.1922389197.1677510164&semt=ais'} className='postImg' alt="postImg" />
                    
                </div>
                <div className="PostBottom">
                    <div className="PostBottomLeft">
                        <img src={LikeImg} onClick={LikeHanlder} className='likeImg' alt="LikeImg" />
                        <img src={HeartImg} onClick={LikeHanlder} className='heartImg' alt="HeartImg" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="PostBottomRight">
                        <span className="PostCommentText">{post.comment} comment</span>
                    </div>
                </div>

            </div>
        </div>
  )
}
export default Post