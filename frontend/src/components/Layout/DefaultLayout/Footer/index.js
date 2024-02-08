import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';

const cx = classNames.bind(styles);

function Footer() {
   return (
      <header className={cx('wrapper')}>
         <div className={cx('footer-panel')}>
            <div className={cx('footer-container')}>
               <div className={cx('big-column')}>
                  <div className={cx('big-column-item')}>
                     <div className={cx('big-column-item-left')}>
                        <div className={cx('small-column-item-left')}>
                           <div className={cx('big-text')}>Thông tin</div>
                           <div className={cx('small-text')}>Email: chien.trinhvan@hust.edu.vn</div>
                           <div className={cx('small-text')}>Hotline: 0123456789</div>
                           <div className={cx('small-text')}>Giờ làm việc: 8h00 - 11h30, 14h - 17h30</div>
                        </div>

                        <div className={cx('small-column-item-right')}>
                           <div className={cx('big-text')}>Tiện ích</div>
                           <Link to="/" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                              <div className={cx('small-text', 'text-hover')}>Introduction</div>
                           </Link>
                           <Link
                              smooth
                              to="/#member"
                              style={{ textDecoration: 'none' }}
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              <div className={cx('small-text', 'text-hover')}>Member</div>
                           </Link>
                           <Link
                              smooth
                              to="/research/main_research"
                              style={{ textDecoration: 'none' }}
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              <div className={cx('small-text', 'text-hover')}>Research</div>
                           </Link>
                           <Link
                              smooth
                              to="/publication"
                              style={{ textDecoration: 'none' }}
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              <div className={cx('small-text', 'text-hover')}>Publication</div>
                           </Link>
                           <Link
                              smooth
                              to="/news"
                              style={{ textDecoration: 'none' }}
                              onClick={() => window.scrollTo(0, 0)}
                           >
                              <div className={cx('small-text', 'text-hover')}>News</div>
                           </Link>
                        </div>
                     </div>
                     <div className={cx('big-column-item-right')}>
                        <div className={cx('small-column-item-left')}>
                           <div className={cx('big-text')}>Chính sách</div>
                           <div className={cx('small-text')}>Chính sách chung</div>
                           <div className={cx('small-text')}>Chính sách bảo mật thông tin</div>
                           <div className={cx('small-text')}>Vi phạm chính sách</div>
                        </div>
                        <div className={cx('small-column-item-right')}>
                           <div className={cx('big-text')}>Kết nối với chúng tôi</div>
                           <div className={cx('list-logo')}>
                              <img src="https://onthisinhvien.com/images/icon/otsv/youtube.svg"></img>
                              <img src="https://onthisinhvien.com/images/icon/otsv/fb.svg"></img>
                              <img src="https://onthisinhvien.com/images/icon/otsv/tiktok.svg"></img>
                              <img src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Ficon%2Fotsv%2Fins.png&w=1920&q=75"></img>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cx('box')}>
                  <MdOutlineLocationOn className={cx('icon-location')} />
                  <div className={cx('small-text')}>
                     Địa chỉ: Phòng 408, Tòa B1 - SoICT, số 1, Đại Cồ Việt, Q.Hai Bà Trưng, TP. Hà Nội
                  </div>
               </div>
            </div>
         </div>
         <div className={cx('footer2')}>
            Copyright 2024 © MCN.CTLab
            <br></br>
            Modern Computer Networks and Communications Technology Lab
         </div>
      </header>
   );
}

export default Footer;
