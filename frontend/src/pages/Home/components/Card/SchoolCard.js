import React from 'react';
import PropTypes from 'prop-types';
import styles from './SchoolCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const SchoolCard = ({ img, shortname, fullname, course }) => {
   return (
      <div className={cx('card-school')}>
         <Link to="/cart" style={{ textDecoration: 'none' }}>
            <div className={cx('top-card-school')}>
               <div className={cx('image-card-school')}>
                  <img src={img} alt={shortname} />
               </div>
               <div className={cx('school-name')}>
                  <p className={cx('short-name')}>{shortname}</p>
                  <p className={cx('full-name')}>{fullname}</p>
               </div>
            </div>
            <div className={cx('bottom-cart-school')}>
               <div className={cx('course')}>
                  <div className={cx('icon-course')}>
                     <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M5.3593 7.92625C5.57929 8.00896 5.79928 8.09167 6.01926 8.17436C6.83402 8.4809 6.83402 8.48193 6.83299 9.33548V15.6406V15.7572C6.83299 15.9255 6.66531 16.0421 6.50791 15.9833C6.13551 15.8429 5.79294 15.7139 5.45037 15.5859C5.06743 15.4424 4.68464 15.2981 4.30179 15.1539C3.28077 14.7691 2.25936 14.3843 1.2336 14.0119C0.875598 13.8819 0.658535 13.531 0.678081 13.1491C0.684466 13.0194 0.682182 12.8884 0.679876 12.7562C0.67921 12.718 0.678542 12.6797 0.678081 12.6413V12.6392V8.26003C0.678081 8.11381 0.673985 7.9668 0.66988 7.81944C0.66164 7.52368 0.653362 7.22655 0.678081 6.93171C0.713058 6.50236 1.09883 6.32999 1.56073 6.50236C2.82799 6.97452 4.09375 7.45042 5.3593 7.92625ZM8.90945 7.94732C8.70796 8.02307 8.50647 8.09883 8.30499 8.17456C7.49023 8.48071 7.49023 8.48212 7.49023 9.33349V9.33671V15.6418V15.7585C7.49023 15.9267 7.65792 16.0433 7.81531 15.9845C8.18772 15.8441 8.53028 15.7151 8.87285 15.5871C9.25579 15.4436 9.63858 15.2993 10.0214 15.1551C11.0424 14.7704 12.0639 14.3855 13.0896 14.0132C13.4476 13.8831 13.6647 13.5322 13.6451 13.1503C13.6451 13.1503 13.6554 12.6405 13.6451 12.6425V12.6405V8.26126C13.6451 8.11504 13.6492 7.96803 13.6533 7.82067C13.6616 7.52491 13.6699 7.22778 13.6451 6.93294C13.6102 6.50359 13.2244 6.33122 12.7625 6.50359C11.4776 6.98176 10.1935 7.46456 8.90945 7.94732Z"
                           fill="#94A6C0"
                        ></path>
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M6.90809 5.5602C8.46765 5.5891 9.72477 4.37328 9.75048 2.81171C9.7762 1.29452 8.54687 0.0209037 7.03463 0.0002616C5.48844 -0.0203805 4.24368 1.18305 4.20973 2.73224C4.17578 4.24943 5.39997 5.53233 6.90809 5.5602ZM4.19667 5.50136L2.66488 6.08553C2.55275 6.14333 2.56201 6.30846 2.68031 6.35284L6.80142 7.89274C6.97733 7.9588 7.17073 7.9588 7.34768 7.89378L11.2795 6.44573C11.3927 6.40445 11.4091 6.2486 11.3062 6.18461L9.90922 5.51478C9.71685 5.39402 9.45966 5.34654 9.26935 5.4704C7.19425 6.81531 5.75524 6.01771 5.02046 5.61044C4.94437 5.56827 4.87584 5.53028 4.81494 5.49929C4.6205 5.40021 4.3911 5.40124 4.19667 5.50136Z"
                           fill="#94A6C0"
                        ></path>
                     </svg>
                  </div>
                  <div className={cx('text-course')}>{course}</div>
               </div>
               <div>
                  <button className={cx('btn-course')}>Xem thêm</button>
               </div>
            </div>
         </Link>
      </div>
   );
};

SchoolCard.propTypes = {
   img: PropTypes.string.isRequired,
   shortname: PropTypes.string.isRequired,
   fullname: PropTypes.string.isRequired,
   course: PropTypes.string.isRequired,
};

export default SchoolCard;
