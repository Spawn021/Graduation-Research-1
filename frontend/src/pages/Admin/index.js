//Admin.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useAuth } from '~/store/AuthContext';
import { Navigate } from 'react-router-dom';
import { Link, useRoutes } from 'react-router-dom';
import Activity from './Activity';
import Student from './Student';
import Instructor from './Instructor';
import PublicationAdmin from './Publication';
import Logo from '~/assets/images/logo.jpg';
import { MdLocalActivity } from 'react-icons/md';
import { IoNewspaperOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
const cx = classNames.bind(styles);
function Admin() {
   const [activeLink, setActiveLink] = useState(null);
   const handleLinkClick = (link) => {
      setActiveLink(link);
      window.scrollTo(0, 0);
   };

   const [isOpen, setIsOpen] = useState(false);

   let childRoutes = useRoutes([
      { path: 'activity', element: <Activity /> },
      { path: 'student', element: <Student /> },
      { path: 'instructor', element: <Instructor /> },
      { path: 'publication', element: <PublicationAdmin /> },
   ]);
   const { isLoggedIn } = useAuth();
   const { logout } = useAuth(); // Access logout function from useAuth

   const handleLogout = () => {
      logout(); // Call logout function
   };
   if (!isLoggedIn) {
      return <Navigate to="/login" />;
   }
   return (
      <div className={cx('wrapper')}>
         <div className={cx('aside_left')}>
            <div className={cx('logo')}>
               <img src={Logo} alt="logo" />
               <p>MCN.CTLab</p>
            </div>

            <div>
               <Link
                  to="activity"
                  style={{ textDecoration: 'none' }}
                  onClick={() => handleLinkClick('/activity')}
                  className={cx('item', {
                     'active-class': activeLink === '/activity',
                  })}
               >
                  <div className={cx('item-icon')}>
                     <MdLocalActivity />
                  </div>
                  <p>Activity</p>
               </Link>
            </div>

            <div>
               <Link
                  to="publication"
                  onClick={() => handleLinkClick('/publication')}
                  className={cx('item', {
                     'active-class': activeLink === '/publication',
                  })}
                  style={{ textDecoration: 'none' }}
               >
                  <div className={cx('item-icon')}>
                     <IoNewspaperOutline />
                  </div>
                  <p>Publication</p>
               </Link>
            </div>
            <div>
               <div className={cx('item')} onClick={() => setIsOpen(!isOpen)}>
                  <div className={cx('item-icon')}>
                     <FaUser />
                  </div>
                  <p>Member</p>
                  <div className={cx('item-icon-after')}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
               </div>
               {isOpen && (
                  <div className={cx('sub-menu')}>
                     <Link
                        to="instructor"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleLinkClick('/instructor')}
                        className={cx('item', 'sub-item', {
                           'active-class': activeLink === '/instructor',
                        })}
                     >
                        Instructor
                     </Link>
                     <Link
                        to="student"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleLinkClick('/student')}
                        className={cx('item', 'sub-item', {
                           'active-class': activeLink === '/student',
                        })}
                     >
                        Student
                     </Link>
                  </div>
               )}
            </div>
         </div>
         <div className={cx('aside_right')}>
            <div className={cx('header')}>
               <div className={cx('icon-menu')}>
                  <AiOutlineMenuFold />
               </div>
               <button className={cx('logout')} onClick={handleLogout}>
                  Logout
               </button>
            </div>
            <div className={cx('content')}>{childRoutes}</div>
         </div>
      </div>
   );
}

export default Admin;
