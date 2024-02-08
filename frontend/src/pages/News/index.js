import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { fetchActivitiesHome } from '~/services/activities';

const cx = classNames.bind(styles);

function News() {
   const [activities, setActivities] = useState([6]);

   useEffect(() => {
      const fetchActivities = async () => {
         try {
            const result = await fetchActivitiesHome();
            setActivities(result);
         } catch (error) {
            console.error('Error fetching activities:', error);
         }
      };

      fetchActivities();
   }, []);

   const [displayActivity, setDisplayActivity] = useState(6);
   const [showMoreButton, setShowMoreButton] = useState(true);
   const [showLessButton, setShowLessButton] = useState(false);
   const toggleShowMore = () => {
      const newDisplayActivity = displayActivity + 3;
      setDisplayActivity(newDisplayActivity);

      if (newDisplayActivity >= activities.length) {
         setShowMoreButton(false);
         setShowLessButton(true);
      }
   };

   const toggleShowLess = () => {
      setDisplayActivity(6);
      setShowLessButton(false);
      setShowMoreButton(true);
   };
   return (
      <div className={cx('wrapper-activity')}>
         <div className={cx('container-activity')}>
            <div className={cx('title-activity')}>
               <h2>TYPICAL ACTIVITIES</h2>
               {/* <p>These are the events and activities that marked MCN.CTLab during the year</p> */}
               <div className={cx('list-activity')}>
                  {activities &&
                     activities?.slice(0, displayActivity).map((acitivity) => (
                        <div className={cx('item-activity')} key={acitivity._id}>
                           <div className={cx('image-activity')}>
                              <img className={cx('image')} src={acitivity.image}></img>
                           </div>
                           <div className={cx('info-activity')}>
                              <div className={cx('name-activity')}>{acitivity.name}</div>
                              <div className={cx('date-activity')}>{acitivity.date}</div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>

            {showMoreButton && (
               <div className={cx('show-more')}>
                  <button onClick={toggleShowMore}>
                     Xem thêm
                     <BiChevronRight className={cx('icon-chev')} />
                  </button>
               </div>
            )}
            {showLessButton && (
               <div className={cx('show-more')}>
                  <button onClick={toggleShowLess}>
                     Thu gọn
                     <BiChevronLeft className={cx('icon-chev')} />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

export default News;
