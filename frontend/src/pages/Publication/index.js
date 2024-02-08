import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaAngleDown } from 'react-icons/fa6';
import { fetchPublications } from '~/services/publications';
import styles from './Publication.module.scss';

const cx = classNames.bind(styles);

function Publication() {
   const [categoriesVisibility, setCategoriesVisibility] = useState({});
   const [publications, setPublications] = useState([]);

   useEffect(() => {
      // Fetch publications when the component mounts
      const fetchData = async () => {
         try {
            const data = await fetchPublications();
            console.log(data);
            setPublications(data);
            // Set initial visibility for each year
            const initialVisibility = {};
            data.forEach((publication) => {
               initialVisibility[publication.year] = true;
            });
            setCategoriesVisibility(initialVisibility);
         } catch (error) {
            console.error('Error fetching publications:', error);
         }
      };

      fetchData();
   }, []); // Empty dependency array ensures the effect runs only once

   const toggleCategoryVisibility = (year) => {
      setCategoriesVisibility((prevVisibility) => ({
         ...prevVisibility,
         [year]: !prevVisibility[year],
      }));
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('publication_container')}>
            <h2>Publications</h2>
            <div className={cx('publication_category-list')}>
               {publications &&
                  publications.map((publication) => (
                     <div
                        key={publication.year}
                        className={cx('publication_category-item', {
                           'item-expand': categoriesVisibility[publication.year],
                        })}
                     >
                        <div
                           className={cx('publication_category-title')}
                           onClick={() => toggleCategoryVisibility(publication.year)}
                        >
                           <div className={cx('icon', { 'icon-expanded': categoriesVisibility[publication.year] })}>
                              <FaAngleDown />
                           </div>
                           <div
                              className={cx('year_publication', {
                                 'year-expand': categoriesVisibility[publication.year],
                              })}
                           >
                              Publication in {publication.year}
                           </div>
                        </div>
                        <ol
                           className={cx('publication_list', {
                              visible: categoriesVisibility[publication.year],
                           })}
                        >
                           {publication?.names.map((name, index) => (
                              <li key={index} className={cx('publication_item')}>
                                 {name}
                              </li>
                           ))}
                        </ol>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
}

export default Publication;
