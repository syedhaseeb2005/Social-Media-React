import './online.css'
 
function online({user}) {

  return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={user.profilepic} alt="rightbarProfileImg" className='rightbarProfileImg' />
                <span className="rightbaronline"></span>
            </div>
            <span className='rightbarUsername'>{user.username}</span>
        </li>
  )
}

export default online