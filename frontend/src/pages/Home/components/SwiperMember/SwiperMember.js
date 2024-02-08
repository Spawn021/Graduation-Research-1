import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import { Pagination } from 'swiper/modules';
import classNames from 'classnames/bind';
import styles from './SwiperMember.module.scss';
import './custom-pagination.css';
import { useState, useEffect } from 'react';
import { fetchInstructorMembers } from '~/services/instructors';

const cx = classNames.bind(styles);

export default function SwiperMember() {
   const [members, setMembers] = useState(null);

   const pagination = {
      clickable: true,
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
   };

   useEffect(() => {
      const getMembers = async () => {
         const members = await fetchInstructorMembers();
         setMembers(members);
      };

      if (!members) {
         getMembers();
      }
   }, []);

   return (
      <Swiper
         slidesPerView={4}
         spaceBetween={20}
         slidesPerGroup={4}
         loop={true}
         pagination={pagination}
         autoplay={{
            delay: 2500,
            disableOnInteraction: false,
         }}
         modules={[Pagination]}
         className="mySwiperSlide"
      >
         {members &&
            members.map((member) => (
               <SwiperSlide key={member._id}>
                  <Link to={`/member/${member._id}`} onClick={() => window.scrollTo(0, 0)}>
                     <div className={cx('container')}>
                        <div className={cx('name')}>{member.name}</div>
                        <img
                           style={{ left: '0px' }}
                           className={cx('image-item')}
                           src={member.image}
                           alt="ImageMember"
                        ></img>
                     </div>
                  </Link>
               </SwiperSlide>
            ))}
      </Swiper>
   );
}
