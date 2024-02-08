import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SwiperMember from './components/SwiperMember/SwiperMember';
import SwiperStudent from './components/SwiperStudent/SwiperStudent';
import SwiperComponent from './components/Swiper/Swiper';
import ListItemCount from './components/ListItemCount/ListItemCount';
import LabTabs from './components/LabTabs/LabTabs';
import YearIcon from '../../assets/images/icons/nam.svg';
import SchoolIcon from '../../assets/images/icons/truong.svg';
import CourseIcon from '../../assets/images/icons/khoa-luyen.svg';
import StdIcon from '../../assets/images/icons/hocvien.svg';
import { FaFacebook } from 'react-icons/fa';
import { fetchInstructors } from '~/services/instructors';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
   const [searchTerm, setSearchTerm] = useState('');
   const [instructors, setInstructors] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const result = await fetchInstructors('');
         setInstructors(result);
      };

      fetchData();
   }, []);
   console.log(instructors);
   const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredInstructors =
      instructors &&
      instructors.filter((instructor) => instructor.name.toLowerCase().includes(searchTerm.toLowerCase()));
   // console.log('ngu', filteredInstructors);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('slide')}>
            <SwiperComponent />
         </div>
         <div className={cx('achive')}>
            <div className={cx('slogan')}>Modern Computer Networks and Communications Technology Lab</div>
            <div className={cx('static-wrapper')}>
               <ListItemCount iconSrc={YearIcon} number={3} numAfter="+" text="Year" />
               <ListItemCount iconSrc={StdIcon} number={20} numAfter="+" text="Member" />
               <ListItemCount iconSrc={CourseIcon} number={400} numAfter="+" text="Research" />
               <ListItemCount iconSrc={SchoolIcon} number={200} numAfter="+" text="Publication" />
            </div>
         </div>
         <div className={cx('block-category')}>
            <div className={cx('school-wrap')}>
               <div className={cx('why-choose')}>
                  <div className={cx('why-choose-container')}>
                     <div className={cx('sub-title')}>
                        <h2>Why choose</h2>
                        <h5>Modern Computer Networks and Communications Technology Lab</h5>
                        <p></p>
                     </div>
                     <div className={cx('why-choose-list-item')}>
                        <div className={cx('why-choose-item')}>
                           <div className={cx('item-top')}>
                              <span>
                                 <img
                                    className={cx('item-image')}
                                    src="https://onthisinhvien.com/images/icon/otsv/icon1-why-choose.svg"
                                    alt="Icon"
                                 ></img>
                              </span>
                           </div>
                           <h3>Em không biết môn này học cái gì?</h3>
                           <span>
                              Đừng lo, Khóa luyện sẽ "Review đề thi" lại cho em, đề thi có bao nhiêu câu, rơi vào những
                              phần kiến thức nào,...
                           </span>
                        </div>
                        <div className={cx('why-choose-item')}>
                           <div className={cx('item-top')}>
                              <span>
                                 <img
                                    className={cx('item-image')}
                                    src="https://onthisinhvien.com/images/icon/otsv/icon2-why-choose.svg"
                                    alt="Icon"
                                 ></img>
                              </span>
                           </div>
                           <h3>Em không biết bắt đầu học từ đâu?</h3>
                           <span>
                              Đừng lo, Khóa luyện luôn tạo ra "Lộ trình học tập" để học từ đầu đến cuối, biết mình đang
                              học đến đâu, cần học thêm những gì.
                           </span>
                        </div>
                        <div className={cx('why-choose-item')}>
                           <div className={cx('item-top')}>
                              <span>
                                 <img
                                    className={cx('item-image')}
                                    src="https://onthisinhvien.com/images/icon/otsv/icon3-why-choose.svg"
                                    alt="Icon"
                                 ></img>
                              </span>
                           </div>
                           <h3>Em không biết hỏi bài ai?</h3>
                           <span>
                              Đừng lo, Khóa luyện có một "Group chat riêng" để hỗ trợ em, giúp em trả lời các câu hỏi,
                              giải đáp các thắc mắc về môn học nhé.
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cx('panel')}>
                  <div>
                     <iframe
                        className={cx('panel-iframe')}
                        src="https://www.youtube.com/embed/M7SO5DdsPjs?si=lxSZqMSpo6eD9wmF"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                     ></iframe>
                  </div>
               </div>
               <div id="member" className={cx('panel-feedback')}>
                  <div className={cx('feedback-container')}>
                     <h3>Instructor Of Lab</h3>
                  </div>
                  <div className={cx('form-search')}>
                     <input
                        type="text"
                        placeholder="Search instructor..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={cx('input-search')}
                     />
                     <button className={cx('button-search')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                     </button>
                  </div>
                  {searchTerm && (
                     <div className={cx('list-search')}>
                        {filteredInstructors.map((instructor) => (
                           <Link
                              to={`/member/${instructor._id}`}
                              style={{ textDecoration: 'none' }}
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              <div className={cx('item-search')} key={instructor.id}>
                                 {instructor.name}
                              </div>
                           </Link>
                        ))}
                     </div>
                  )}
                  <div className={cx('slide-feedback')}>
                     <SwiperMember />
                  </div>
               </div>
               <div className={cx('wrapper-social')}>
                  <div className={cx('container-social')}>
                     <div>
                        <div className={cx('title')}>
                           <span>MCN.CTLab</span> TRÊN CÁC <span>NỀN TẢNG</span> MẠNG XÃ HỘI
                        </div>
                        <div className={cx('description')}></div>
                        <div className={cx('wrapper-item')}>
                           <div className={cx('box-item')}>
                              <div className={cx('item-social')}>
                                 <div className={cx('image-social')}>
                                    <img
                                       src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Ficon%2Fotsv%2Fyoutube.png&w=1920&q=75"
                                       alt="Youtube"
                                    ></img>
                                    <div className={cx('number-social')}>
                                       <svg
                                          className={cx('eye-icon')}
                                          focusable="false"
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          data-testid="RemoveRedEyeIcon"
                                       >
                                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                                       </svg>
                                       <span>2.772.063 </span>
                                    </div>
                                    <a href="https://www.youtube.com/c/%C3%94nthiSinhvi%C3%AAn">
                                       <div className={cx('subscriber')}>
                                          <div className={cx('subscriber-text')}>subscriber</div>
                                       </div>
                                    </a>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('box-item')}>
                              <div className={cx('item-social')}>
                                 <div className={cx('image-social')}>
                                    <div className={cx('icon-social')}>
                                       <FaFacebook></FaFacebook>
                                    </div>
                                    <div className={cx('number-social')}>
                                       <svg
                                          className={cx('eye-icon')}
                                          focusable="false"
                                          aria-hidden="true"
                                          viewBox="0 0 24 24"
                                          data-testid="RemoveRedEyeIcon"
                                       >
                                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                                       </svg>
                                       <span>2.772.063 </span>
                                    </div>
                                    <a href="https://www.facebook.com/MCN.CTLab">
                                       <div className={cx('subscriber')}>
                                          <div className={cx('subscriber-text')}>follow</div>
                                       </div>
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cx('mission')}>
                  <div className={cx('wrapper-mission')}>
                     <div className={cx('name')}>
                        <h2>MCN.CTLab</h2>
                     </div>
                     <LabTabs />
                  </div>
                  <div className={cx('feedback-container')}>
                     <h3>Student Of Lab</h3>
                  </div>
                  <div className={cx('slide-feedback')}>
                     <SwiperStudent />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
