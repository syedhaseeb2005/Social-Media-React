import React from "react";
import './sidebar.css'
import {User} from '../../dummydata'
import Closefriend from "../closefriend/closefriend";
import {RssFeed,
        Chat,
        PlayCircleFilledOutlined,
        Group,
        Bookmark,
        HelpOutline,
        WorkOutline,
        Event,
        School} from '@mui/icons-material'

export default function Sidebar() {
    return(
        <>
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <RssFeed className="sidebaricon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarlistItem">
                        <Chat className="sidebaricon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarlistItem">
                        <PlayCircleFilledOutlined className="sidebaricon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarlistItem">
                        <Group className="sidebaricon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarlistItem">
                        <Bookmark className="sidebaricon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarlistItem">
                        <HelpOutline className="sidebaricon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarlistItem">
                        <WorkOutline className="sidebaricon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarlistItem">
                        <Event className="sidebaricon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarlistItem">
                        <School className="sidebaricon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                <button className="sidebarbutton">Show more</button>
                </ul>
                <hr className="sidebarhr"/>
                <ul className="sidebarFriendList">
                    {User.map(u=>(
                        <Closefriend key={u.id} user={u}  />
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}