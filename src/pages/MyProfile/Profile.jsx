import { useState , useEffect } from 'react'
import './Profile.css'
import profileImage from '../../components/assets/Person/download (1).png';
// import ProfilePic from '../../components/assets/Person/myimg.png'
import ProfilecoverImg from '../../components/assets/Person/postimg6.png'
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from '../../components/sidebar/sidebar.jsx'
import Rightbar from '../../components/rightbar/rightbar.jsx'
import Feed from "../../components/feed/feed.jsx"
import axios from 'axios'
import { useParams } from 'react-router-dom';
export default function Profile() {
    const [User,setUser] = useState({})
    const username = useParams().username
    // console.log(username);
    useEffect(()=>{
        const FetchUsers = async ()=>{
            const res = await axios.get(`http://localhost:5500/api/user?username=${username}`);
            // console.log(res.data );
            setUser(res.data)
        }
        FetchUsers()
    },[username])



  return (
        <>
            <Topbar/>
            <div className="Profile">
                <Sidebar />
                <div className='ProfileRight'>
                    <div className="profilerightTop">
                        <div className="profileCover">
                        <img 
                        src={User?.coverPicture || ProfilecoverImg} 
                        className='ProfileCoverImg' 
                        alt="ProfileCoverImg" />
                        <img 
                        src={User?.profilePicture || profileImage} alt='ProfileUserImg' 
                        className='ProfileUserImg'/>
                        <div className="ProfileInfo">
                            <h4 className='ProfileInfoName'>{User?.username}</h4>
                            <h4 className='ProfileInfodesc'>{User?.desc}</h4>
                        </div>
                        </div>
                    </div>
                    <div className="profilerightBottom">
                        <Feed username={username} />
                        <Rightbar user={User} />
                    </div>
                </div>
            </div>
        </>
    // <div>Profile</div>
  )
}
