import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import styles from './ListIemCount.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ListItemCount({ iconSrc, number, text, numAfter }) {
   return (
      <div className={cx('list-item-count')}>
         <div className={cx('item-count')}>
            <div className={cx('image-count')}>
               <div className={cx('hover-show-count')}></div>
               <img className={cx('icon-count')} src={iconSrc} alt="Icon"></img>
            </div>
            <div className={cx('number-count')}>
               <CountUp end={number} separator="," duration={3} />
               <div>{numAfter}</div>
            </div>
            <div className={cx('text-count')}>{text}</div>
         </div>
      </div>
   );
}

ListItemCount.propTypes = {
   iconSrc: PropTypes.string.isRequired,
   number: PropTypes.number.isRequired,
   text: PropTypes.string.isRequired,
   numAfter: PropTypes.string.isRequired,
};

export default ListItemCount;
