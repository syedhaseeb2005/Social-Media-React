import { useContext } from 'react'
import Person1img from '../assets/Person/img.png'
import './topbar.css'
import { Search , Person , Chat , Notifications} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {Authcontext} from '../../context/Authcontext'
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
export default function Topbar(){
    const { user } = useContext(Authcontext);
    // console.log(user);
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        navigate('/login');
    }
    return(
        <div className='topbarcontainer'>
            <div className='topbarLeft'>
                <Link  to='/' style={{textDecoration:'none'}}>
                    <span className='logo' style={{textTransform:"capitalize"}}>{user?.username} Social</span>
                </Link>
            </div>
            <div className='topbarCenter'>
                <div className='search-bar'>
                    <Search  className='search-icon'/>
                    <input placeholder='Search for friend, post or video' className='search-input'/>
                </div>
            </div>
            <div className='topbarRight'>
                <span className='top-barlinks'>Home</span>
                <span className='top-barlinks'>Timeline</span>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbariconbadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Chat />
                        <span className='topbariconbadge'>2</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbariconbadge'>3</span>
                    </div>
                </div>
                <button onClick={logoutHandler} style={{border:'none',background:'transparent'}}><LogoutIcon style={{display:"flex",alignItems:'center',color:'#fff',cursor:'pointer'}}/></button>
            </div>
            <Link to={`profile/${user?.username}`}>
            <img src={user?.profilePicture ?  user?.profilePicture :  Person1img}  alt='Profile-Pic' className='Topbar-img' />
            </Link>
        </div>
    )
}
