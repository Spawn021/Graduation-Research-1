// MainResearch.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainResearch.module.scss';
import LabTabs from './components/LabTabs';
const cx = classNames.bind(styles);

function MainResearch() {
   return (
      <div>
         <h1>Main Research Topics</h1>
         <div className={cx('content')}>
            <LabTabs />
         </div>
      </div>
   );
}

export default MainResearch;
