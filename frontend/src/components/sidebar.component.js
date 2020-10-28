import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import '../Sidebar.css'

const SidebarData=[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Stock',
        path: '/product',
        icon: <AiIcons.AiOutlineShoppingCart />,
        cName: 'nav-text'
    },
    {
        title: 'Contact Us',
        path: '#',
        icon: <AiIcons.AiOutlinePhone />,
        cName: 'nav-text'
    }
]

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="sidebar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaHamburger onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index)=>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul> 
            </nav>
        </>
    )
}

export default Sidebar
