import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import classNames from 'classnames/bind';
import styles from './LabTabs.module.scss';
const cx = classNames.bind(styles);
export default function LabTabs() {
   const [value, setValue] = React.useState('1');

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Box
         sx={{
            width: '100%',
            // typography: 'body1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight: '10px',
            // justifyContent: 'center',
            // paddingLeft: '10px',
         }}
      >
         <TabContext value={value}>
            <Box>
               <TabList
                  onChange={handleChange}
                  aria-label="Hệ thống Ôn thi sinh viên"
                  sx={{ justifyContent: 'space-around', display: 'flex' }}
                  className={cx('tab-list')}
               >
                  <Tab label="Tầm nhìn" value="1" className={cx('myCustomTab', { myCustomTabActive: value === '1' })} />
                  <Tab label="Sứ mệnh" value="2" className={cx('myCustomTab', { myCustomTabActive: value === '2' })} />
                  <Tab
                     label="Giá trị cốt lõi"
                     value="3"
                     className={cx('myCustomTab', { myCustomTabActive: value === '3' })}
                  />
                  <Tab
                     label="Chặng đường phát triển"
                     value="4"
                     className={cx('myCustomTab', { myCustomTabActive: value === '4' })}
                  />
                  <Tab label="Văn hóa" value="5" className={cx('myCustomTab', { myCustomTabActive: value === '5' })} />
               </TabList>
            </Box>
            <TabPanel value="1">
               <div className={cx('tab')}>
                  <div className={cx('image-content')}>
                     <img src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Ficon%2Fotsv%2Ftam-nhin.png&w=1920&q=75"></img>
                  </div>
                  <div className={cx('content')}>
                     Bằng nỗ lực sáng tạo nội dung, công nghệ và đổi mới trong quản trị,
                     <span> MCN.CTLab </span>
                     mong muốn trở thành công ty có phần mềm luyện thi được sinh viên sử dụng phổ biến nhất trong nước.
                  </div>
               </div>
            </TabPanel>
            <TabPanel value="2">
               <div className={cx('tab')}>
                  <div className={cx('image-content')}>
                     <img src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Ficon%2Fotsv%2Fsu-menh.png&w=1920&q=75"></img>
                  </div>
                  <div className={cx('content')}>
                     Sứ mệnh của Modern Computer Networks and Communications Technology Lab là phát triển phần mềm luyện
                     thi thay đổi cách học và ôn thi thông qua công cụ với nội dung bám sát chương trình học và tính
                     năng thông minh tăng hiệu quả học tập.
                  </div>
               </div>
            </TabPanel>
            <TabPanel value="3">
               <div className={cx('tab1')}>
                  <div className={cx('item')}>
                     <div className={cx('item-image')}>
                        <img src="https://onthisinhvien.com/images/icon/otsv/tam-huyet.svg"></img>
                     </div>
                     <div className={cx('item-content')}>
                        <div className={cx('title')}>Tâm Huyết</div>
                        <div className={cx('content')}>
                           Đội ngũ MCN.CTLab từ những anh/chị biên soạn nội dung, đến anh/chị admin tin tức và admin học
                           tập luôn
                           <span> NHIỆT TÌNH, TÂM HUYẾT </span>
                           phục vụ vì sinh viên, là người bạn đồng hành trong học tập.
                        </div>
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <div className={cx('item-image')}>
                        <img src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     </div>
                     <div className={cx('item-content')}>
                        <div className={cx('title')}>Chất Lượng</div>
                        <div className={cx('content')}>
                           Các khóa luyện luôn bám sát chương trình học và đề thi theo từng trường đại học. Sinh viên có
                           thể làm quen với các dạng bài tập, câu hỏi lý thuyết để tăng tốc độ làm đề. Bằng ứng dụng
                           <span> CNTT </span>
                           sẽ giúp sinh viên học tập mọi lúc mọi nơi, trên nhiều thiết bị. Tự động xác định những phần
                           kiến thức yếu của học viên để cải thiện..
                        </div>
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <div className={cx('item-image')}>
                        <img src="https://onthisinhvien.com/images/icon/otsv/con-nguoi.svg"></img>
                     </div>
                     <div className={cx('item-content')}>
                        <div className={cx('title')}>Con người</div>
                        <div className={cx('content')}>
                           MCN.CTLab team gồm các anh/chị không chỉ
                           <span> GIỎI CHUYÊN MÔN, KỸ NĂNG VĂN PHÒNG </span>
                           mà còn năng động và sáng tạo. Không ngừng học hỏi và vượt qua mọi giới hạn. Sẵn sàng tiếp
                           nhận tích cực những đóng góp từ phía học viên và cải thiện nội dung hàng kỳ. Giữ trong mình
                           những chuẩn mực đạo đức, văn hóa và tác phong làm việc chuyên nghiệp
                        </div>
                     </div>
                  </div>
               </div>
            </TabPanel>
            <TabPanel value="4">
               <div className={cx('box')}>
                  <div className={cx('item')}>
                     <img src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     <div className={cx('text-content')}>Năm 2014, Mở các lớp ôn luyện trực tiếp đầu tiên tại NEU</div>
                  </div>
                  <div className={cx('item')}>
                     <img src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     <div className={cx('text-content')}>
                        Năm 2017, Phát triển, mở rộng thị trường theo hướng phần mềm luyện thi như ngày nay, tiền thân
                        là hocthongminh.com
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <img src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     <div className={cx('text-content')}>
                        Năm 2019-2020, Mở rộng các chi nhánh (NEU, HUCE, UEH, UEL, TMU, HVTC,..) và lấy tên gọi chính
                        thức là Ôn thi sinh viên vào ngày: 01/08/2019
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <img src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     <div className={cx('text-content')}>
                        Năm 2021, Tận dụng cơ hội phát triển thương hiệu và vươn lên trở thành chuyên nghiệp
                     </div>
                  </div>
               </div>
            </TabPanel>
            <TabPanel value="5">
               <div className={cx('tab5')}>
                  <div className={cx('tab-iframe')}>
                     <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/M7SO5DdsPjs?si=lxSZqMSpo6eD9wmF"
                        title="Cắm trại cùng OTSV 2022"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen=""
                     ></iframe>
                  </div>
                  <div className={cx('item')}>
                     <img className={cx('tab5')} src="https://onthisinhvien.com/images/icon/otsv/chat-luong.svg"></img>
                     <div className={cx('text-content-tab5')}>
                        Tổ chức và duy trì các hoạt động văn hóa giải trí sau những giờ làm việc căng thẳng, và là cầu
                        nối, động viên tinh thần, gắn kết các thành viên. Môi trường làm việc trẻ trung, năng động, bình
                        đẳng và hồn nhiên. Các hoạt động nổi bật:
                        <div className={cx('list-item')}>
                           <div> + Cắm trại</div>
                           <div> + Họp team định kỳ</div>
                           <div> + Đào tạo nội bộ</div>
                        </div>
                     </div>
                  </div>
               </div>
            </TabPanel>
         </TabContext>
      </Box>
   );
}
