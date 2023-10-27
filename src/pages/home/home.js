// import React from "react";
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from '../../components/sidebar/sidebar.jsx'
import Rightbar from '../../components/rightbar/rightbar.jsx'
import Feed from "../../components/feed/feed.jsx"
import './home.css'

export default function App(){
    return(
        <>
            <Topbar/>
            <div className="home-container">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    
    )
}