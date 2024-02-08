import { Link, useRoutes } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Research.module.scss';
import MainResearch from './MainResearch';
import PastProject from './PastProject';
const cx = classNames.bind(styles);

function Research() {
   let childRoutes = useRoutes([
      { path: 'main_research', element: <MainResearch /> },
      { path: 'past_project', element: <PastProject /> },
   ]);
   const linkRef = useRef(null);

   useEffect(() => {
      linkRef.current.focus();
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('left-col')}>
               <div className={cx('topic')}>Research</div>
               <Link to="main_research" className={cx('link')} ref={linkRef}>
                  Research topics
               </Link>
               <Link to="past_project" className={cx('link')}>
                  Past project
               </Link>
            </div>
            <div className={cx('right-col')}>{childRoutes}</div>
         </div>
      </div>
   );
}

export default Research;
