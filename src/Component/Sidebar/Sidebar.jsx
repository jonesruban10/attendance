import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import LOgo from './vlblogo.jpg'
import { useNavigate } from 'react-router-dom';
import { isArrayNonEmpty, isValidElement } from '../../utils';
import { HomeOutlined, LogoutOutlined, RiseOutlined, UserAddOutlined } from '@ant-design/icons';


function Sidebar() {
    const [selected, setselected] = useState(0);
    const logoclick = () => {
        window.location.reload();
    }

    const navigate = useNavigate();

    const [Buttonname, setButtonName] = useState([

        {
            heading: "Attendance",
            icon: HomeOutlined,
            path: '/attendance'
        },
        {
            heading: "StaffDetails",
            icon: UserAddOutlined,
            path: '/staffdetails'
        },
        {
            heading: "StudentDetails",
            icon: UserAddOutlined,
            path: '/studentdetails',
        },
        {
            heading: "Viewpage",
            icon: RiseOutlined,
            path: "/viewpage"
        },
        {
            heading: "Leave Form",
            icon: RiseOutlined,
            path: "/leaveform"
        },
        {
            heading: "Add Account",
            icon: RiseOutlined,
            path: "/addaccount"
        },
        {
            heading: "Logout",
            icon: LogoutOutlined,
            path: "/logout"
        },
    ]);
    
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});

 

  useEffect(() => {
    const data = isValidElement( localStorage.getItem("user"))? JSON.parse(localStorage.getItem('user')) : {}
    setUser(data);

    if(isValidElement(data?.id)) {
        if(data?.status === 'staff') {
            setButtonName([
                {
                    heading: "Attendance",
                    icon: HomeOutlined,
                    path: '/attendance'
                },
                {
                    heading: "Viewpage",
                    icon: RiseOutlined,
                    path: "/viewpage"
                },
                {
                    heading: "Leave Form",
                    icon: RiseOutlined,
                    path: "/leaveform"
                },
                {
                    heading: "Logout",
                    icon: LogoutOutlined,
                    path: "/logout"
                }])
        }
        if(data?.status === 'student') {
            setButtonName([
                {
                    heading: "Viewpage",
                    icon: RiseOutlined,
                    path: "/viewpage"
                },
                {
                    heading: "Leave Form",
                    icon: RiseOutlined,
                    path: "/leaveform"
                },
                {
                    heading: "Logout",
                    icon: LogoutOutlined,
                    path: "/logout"
                }])
        }
    }

  },[])

    return (
        <div className='Sidebutton'>
            <div className='logo' >
                <img onClick={logoclick} title='Reload' src={LOgo} alt='' />
                <span onClick={() => window.open('https://vlbjcas.ac.in/user/teaching_faculty/DEPARTMENT6455dd172f580')}>
                    VLBJCAS
                </span>
            </div>
            <div className='menu'>
                {isArrayNonEmpty(Buttonname) && Buttonname?.map((item,index) => {
                    return (
                        <div className={selected === index? 'menuItem active' : 'menuItem'}
                            key={index}
                            onClick={() => {
                                if(item.path === "/logout") {
                                    
                                console.log('item',item);
                                    localStorage.clear();
                                    window.location.href="/"
                                }else {
                                setselected(index);
                                navigate(item.path);
                                }
                            }}>
                            <item.icon />
                            <span>
                                {item.heading}
                            </span>

                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Sidebar