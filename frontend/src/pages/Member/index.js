import classNames from 'classnames/bind';
import styles from './Member.module.scss';
import { fetchInstructor } from '~/services/instructors';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Member() {
   let { id } = useParams();

   const [member, setMember] = useState(null);

   useEffect(() => {
      const getMember = async (id) => {
         const member = await fetchInstructor(id);
         setMember(member);
      };

      getMember(id);
   }, [id]);
   console.log('member', member);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('member-container')}>
            <div className={cx('left-column')}>
               <div className={cx('item-left-column')}>
                  <div className={cx('member-avatar')}>
                     <img src={member?.image} alt="ImageMember"></img>
                  </div>
                  <div className={cx('member-info')}>
                     <div className={cx('member-info__name')}>{member?.name}</div>
                     <div className={cx('member-info__position')}>
                        {member?.positions.map((position) => {
                           return (
                              <div>
                                 <strong>{position}</strong>
                              </div>
                           );
                        })}
                     </div>
                     <div className={cx('member-info__degree')}>
                        {member?.degrees.map((degree) => {
                           return <p>{degree}</p>;
                        })}
                     </div>
                     <div className={cx('member-info__email')}>
                        <p>
                           Email: <span>{member?.email}</span>
                        </p>
                     </div>
                  </div>
               </div>
               <div className={cx('item-left-column')}>
                  <div className={cx('research-interest')}>LĨNH VỰC NGHIÊN CỨU</div>
                  <ul className={cx('list')}>
                     {member?.researchInterests.map((researchInterest) => (
                        <li className={cx('item')}>{researchInterest}</li>
                     ))}
                  </ul>
               </div>
               <div className={cx('item-left-column')}>
                  <div className={cx('studies-interest')}>CÁC NGHIÊN CỨU QUAN TÂM</div>
                  <ul className={cx('list')}>
                     {member?.studyInterests.map((researchInterest) => (
                        <li className={cx('item')}>{researchInterest}</li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className={cx('right-column')}>
               <div className={cx('item-right-column')}>
                  <div className={cx('intro')}>GIỚI THIỆU</div>
                  {member?.intro.map((introItem) => (
                     <p>{introItem}</p>
                  ))}
               </div>
               <div className={cx('item-right-column')}>
                  <div className={cx('research-project')}>DỰ ÁN NGHIÊN CỨU</div>
                  <ul>
                     {member?.researchProjects.map((proj) => (
                        <li className={cx('item')}>{proj}</li>
                     ))}
                  </ul>
               </div>
               <div className={cx('item-right-column')}>
                  <div className={cx('prize')}>GIẢI THƯỞNG</div>
                  <ul>
                     {member?.prizes.map((prize) => (
                        <li className={cx('item')}>{prize}</li>
                     ))}
                  </ul>
               </div>
               <div className={cx('item-right-column')}>
                  <div className={cx('teaching')}>GIẢNG DẠY</div>
                  <ul>
                     {member?.teachings.map((teaching) => (
                        <li className={cx('item')}>{teaching}</li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Member;
