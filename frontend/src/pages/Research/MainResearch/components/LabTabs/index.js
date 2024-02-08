import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
         }}
      >
         <TabContext value={value}>
            <Box>
               <TabList
                  onChange={handleChange}
                  aria-label="MCN.CTLab"
                  sx={{ justifyContent: 'space-between', display: 'flex' }}
                  className={cx('tab-list')}
               >
                  <Tab
                     label="Wireless Distributed Learning"
                     value="1"
                     className={cx('myCustomTab', { myCustomTabActive: value === '1' })}
                  />
                  <Tab
                     label="Wireless Edge Processing"
                     value="2"
                     className={cx('myCustomTab', { myCustomTabActive: value === '2' })}
                  />
                  <Tab
                     label="5G/6G Communication Systems"
                     value="3"
                     className={cx('myCustomTab', { myCustomTabActive: value === '3' })}
                  />
               </TabList>
            </Box>
            <TabPanel value="1">
               <div className={cx('tab')}>
                  <div className={cx('title-section')}>
                     <span></span>
                     <div className={cx('title-text')}>Wireless Distributed Learning</div>
                     <span></span>
                  </div>
                  <div className={cx('image-content')}>
                     <img src="http://wcisl.snu.ac.kr/group1.jpg" alt="Wireless Distributed Learning" />
                  </div>
                  <div className={cx('content')}>
                     Federated learning (FL) and split learning (SL) are distributed machine learning techniques where
                     local nodes collaboratively train one target model based on communication. We try to solve the
                     question that “how to design FL and SL algorithms to achieve reliable performance and low latency
                     in wireless communication systems?” To achieve this goal, we explore many related issues involving
                     wireless information delivery such as Byzantine fault, straggler, multiple access, communication
                     delay/errors, distributed consensus (distributed ledger/block-chain), etc.
                  </div>
                  <div className={cx('sub_section')}>Ongoing Projects</div>
                  <div>초지능/초연결을 위한 IoT 네트워크 기반 고신뢰/저지연 무선 분산 협력/스플릿 기계학습</div>
                  <div>IoT device를 위한 분할 학습 및 추론</div>
                  <div className={cx('sub_section')}>Selected recent publications</div>
                  <p>
                     [1] S. Park and W. Choi, "On the Differential Privacy in Federated Learning based on Over-the-Air
                     Computation," IEEE Transactions on Wireless Communications, Accepted for publication.
                  </p>
                  <p>
                     [2] J. -P. Hong, S. Park and W. Choi, "Base Station Dataset-Assisted Broadband Over-the-Air
                     Aggregation for Communication-Efficient Federated Learning," IEEE Transactions on Wireless
                     Communications, vol. 22, no. 11, pp. 7259-7272, Nov. 2023.
                  </p>
                  <p>
                     [3] J. Lee, H. Lee and W. Choi, "Wireless Channel Adaptive DNN Split Inference for
                     Resource-Constrained Edge Devices," IEEE Communications Letters, vol. 27, no. 6, pp. 1520-1524,
                     Jun. 2023.
                  </p>
                  <p>
                     [4] S. Park and W. Choi, "Regulated Subspace Projection Based Local Model Update Compression for
                     Communication-Efficient Federated Learning," IEEE Journal on Selected Areas in Communications, vol.
                     41, no. 4, pp. 964-976, Apr. 2023.
                  </p>
                  <p>
                     [5] H. Lee, H. Seo, and W. Choi, "Fast and Scalable Distributed Consensus Over Wireless Large-Scale
                     Internet of Things Network," IEEE Internet of Things Journal, vol. 9, no. 11, pp. 7916-7930, Jun.
                     2022.
                  </p>
               </div>
            </TabPanel>
            <TabPanel value="2">
               <div className={cx('tab')}>
                  <div className={cx('title-section')}>
                     <span></span>
                     <div className={cx('title-text')}>Wireless Edge Processing</div>
                     <span></span>
                  </div>
                  <div className={cx('image-content')}>
                     <img src="http://wcisl.snu.ac.kr/group2.jpg" alt="Wireless Edge Processing" />
                  </div>
                  <div className={cx('content')}>
                     Wireless Edge Processing deals with the communication systems where wireless edge nodes
                     collaboratively carry out specific tasks by computing, caching, and exchanging data in a
                     distributed way. The convergence of 3C (Computing, Caching, and Communication) essentially leads a
                     new paradigm of wireless information system design. We aim at devising break-through techniques and
                     building up a new framework of 3C convergence. Key issues involve task assignment (or function
                     mapping), straggler effect, data shuffling, data transfer, aggregation (or function reduction)
                  </div>
                  <div className={cx('sub_section')}>Ongoing Projects</div>
                  <div>초지능/초연결을 위한 IoT 네트워크 기반 고신뢰/저지연 무선 분산 협력/스플릿 기계학습</div>
                  <div>IoT device를 위한 분할 학습 및 추론</div>
                  <div className={cx('sub_section')}>Selected recent publications</div>
                  <p>
                     [1] K. Son and W. Choi, "Coded Matrix Computation in Wireless Network," IEEE Transactions on
                     Wireless Communications, Accepted for publication.
                  </p>
                  <p>
                     [2] J. -P. Hong, S. Park and W. Choi, "Base Station Dataset-Assisted Broadband Over-the-Air
                     Aggregation for Communication-Efficient Federated Learning," IEEE Transactions on Wireless
                     Communications, vol. 22, no. 11, pp. 7259-7272, Nov. 2023.
                  </p>
                  <p>
                     [3] J. Lee, H. Lee and W. Choi, "Wireless Channel Adaptive DNN Split Inference for
                     Resource-Constrained Edge Devices," IEEE Communications Letters, vol. 27, no. 6, pp. 1520-1524,
                     Jun. 2023.
                  </p>
                  <p>
                     [4] S. Park and W. Choi, "Regulated Subspace Projection Based Local Model Update Compression for
                     Communication-Efficient Federated Learning," IEEE Journal on Selected Areas in Communications, vol.
                     41, no. 4, pp. 964-976, Apr. 2023.
                  </p>
                  <p>
                     [5] H. Lee, H. Seo, and W. Choi, "Fast and Scalable Distributed Consensus Over Wireless Large-Scale
                     Internet of Things Network," IEEE Internet of Things Journal, vol. 9, no. 11, pp. 7916-7930, Jun.
                     2022.
                  </p>
               </div>
            </TabPanel>
            <TabPanel value="3">
               <div className={cx('tab')}>
                  <div className={cx('title-section')}>
                     <span></span>
                     <div className={cx('title-text')}>5G/6G Communication Systems</div>
                     <span></span>
                  </div>
                  <div className={cx('image-content')}>
                     <img src="http://wcisl.snu.ac.kr/group3.jpg" alt="5G/6G Communication Systems" />
                  </div>
                  <div className={cx('content')}>
                     We are focusing on and building up technical fundamentals of advanced wireless information systems
                     and developing key techniques enabling 5G/6G, in the areas of massive MIMO, massive connections,
                     ultra-reliable and low-latency communication, dynamic spectrum sharing, advanced antenna technology
                     such as IRS and Lens-MIMO, and D2D/V2X communication. We authored the most cited (more than 8,000
                     times, google scholar) 5G paper: “What will 5G be?” IEEE Journal on Selected Areas in
                     Communications, June 2014.
                  </div>
                  <div className={cx('sub_section')}>Ongoing Projects</div>
                  <div>초지능/초연결을 위한 IoT 네트워크 기반 고신뢰/저지연 무선 분산 협력/스플릿 기계학습</div>
                  <div>IoT device를 위한 분할 학습 및 추론</div>
                  <div className={cx('sub_section')}>Selected recent publications</div>
                  <p>
                     [1] S. Park and W. Choi, "On the Differential Privacy in Federated Learning based on Over-the-Air
                     Computation," IEEE Transactions on Wireless Communications, Accepted for publication.
                  </p>
                  <p>
                     [2] J. -P. Hong, S. Park and W. Choi, "Base Station Dataset-Assisted Broadband Over-the-Air
                     Aggregation for Communication-Efficient Federated Learning," IEEE Transactions on Wireless
                     Communications, vol. 22, no. 11, pp. 7259-7272, Nov. 2023.
                  </p>
                  <p>
                     [3] J. Lee, H. Lee and W. Choi, "Wireless Channel Adaptive DNN Split Inference for
                     Resource-Constrained Edge Devices," IEEE Communications Letters, vol. 27, no. 6, pp. 1520-1524,
                     Jun. 2023.
                  </p>
                  <p>
                     [4] S. Park and W. Choi, "Regulated Subspace Projection Based Local Model Update Compression for
                     Communication-Efficient Federated Learning," IEEE Journal on Selected Areas in Communications, vol.
                     41, no. 4, pp. 964-976, Apr. 2023.
                  </p>
                  <p>
                     [5] H. Lee, H. Seo, and W. Choi, "Fast and Scalable Distributed Consensus Over Wireless Large-Scale
                     Internet of Things Network," IEEE Internet of Things Journal, vol. 9, no. 11, pp. 7916-7930, Jun.
                     2022.
                  </p>
               </div>
            </TabPanel>
         </TabContext>
      </Box>
   );
}
