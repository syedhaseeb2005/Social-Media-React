import './rightbar.css'
import SimpleImg from '../assets/Person/images (3).jpg'
import GiftImg from '../assets/Person/download (4).jpg'
import {User} from '../../dummydata'
import Online from '../onlineFriend/online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Authcontext } from '../../context/Authcontext'
import {Add, Remove} from '@mui/icons-material'

export default function Rightbar({user}) {
    // console.log(user);
    const [friends , setFriendslist] = useState([])
    const {user:currentuser} = useContext(Authcontext)
    const [follow , setfollow] = useState(false)

    useEffect(()=>{
        setfollow(currentuser?.following.includes(user?.id))
    },[currentuser , user?.id])
 
    useEffect(() => {
        if (user?._id) { 
            const getfriends = async () => {
                try {
                    const friendlist = await axios.get(`http://localhost:5500/api/user/friends/${user?._id}`);
                    console.log(friendlist.data);
                    setFriendslist(friendlist.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getfriends();
        }
    }, [user?._id]);
    
    const handleclick = async ()=>{
        try {
            if(follow && currentuser?._id && user?.id){
                await axios.put('http://localhost:5500/api/user'+user?._id+'/follow',{userId : currentuser?._id})
            }else{
                await axios.put('http://localhost:5500/api/user'+user?._id+'/unfollow',{userId : currentuser?._id})
            }
        } catch (error) {
            console.log(error);
        }
        setfollow(!follow)
    }
    const HomeRightbar = ()=>{
        return(
            <>
            <div className="birthdaycontainer">
                    <img src={GiftImg} alt="GiftImg" className='GiftImg' />
                    <div className="birthdayText">
                        <b>Syed Haseeb</b> and <b>3 other friends</b> have a birthday today
                    </div>
                </div>
                <img src={SimpleImg} alt="SimpleImg" className='SimpleImgRightbar'/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="RightbarfriendList">
                    {User.map(u=>(
                        <Online key={u.id} user={u} />
                    ))}    
                </ul>
            </>
        )
    } 
    const ProfileRightbar = ()=>{

        return(
            <>
            {user?.username !== currentuser?.username && (
                <button onClick={handleclick} className="rightbarfollowbutton">
                    {follow ? 'Unfollow' : 'Follow'}
                    {follow ? <Remove/> : <Add/>}
                </button>
            )}
            <h4 className='rightbarTitle'>User Information</h4>
            <div className="rightbarInfo">
                <div className="RightbarinfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user?.city}</span>
                </div>
                <div className="RightbarinfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user?.from}</span>
                </div>
                <div className="RightbarinfoItem">
                    <span className="rightbarInfoKey">RelationShip:</span>
                    <span className="rightbarInfoValue">{
                    user?.relationship === 1 ? 'Single' : 
                    user?.relationship === 1 ? 'Married' : 
                    '-'  }</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Freinds</h4>
            <div className="rightbarFollowings">
                {friends.map((friend) =>(
                    <Link key={friend.id} style={{textDecoration:'none',color:'#fff'}} to={'/profile/'+friend.username}>
                        <div className="rightbarfollowing">
                            <img src={friend?.profilePicture} alt="img" className="rightbarFollowingImg" />
                            <span className="rightbarFollwoingName" style={{textTransform:"capitalize"}}>{friend?.username}</span>
                        </div>
                    </Link>
                
                ))}
            </div>
            </>
        )
    }

    return(
        <>
        <div className='rightbar'>
            <div className="rightWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
        </>
    )
}