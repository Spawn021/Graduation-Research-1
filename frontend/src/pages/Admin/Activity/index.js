//Activity.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import {
   fetchActivities,
   createActivityApi,
   deleteActivitiesApi,
   deleteActivityApi,
   getActivity,
   updateActivityApi,
} from '~/services/activities';
// import { useAuth } from '~/store/AuthContext';
// import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { IoAddCircle } from 'react-icons/io5';
import { FaMinusCircle } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
const cx = classNames.bind(styles);
function Activity() {
   // const { isLoggedIn } = useAuth();
   // if (!isLoggedIn) {
   //    return <Navigate to="/login" />;
   // }
   const [activities, setActivities] = useState(null);
   const [isUpdateData, setIsUpdateData] = useState(true);
   const [isSelectCheckBoxes, setIsSelectCheckBoxes] = useState([]);

   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [totalDocs, setTotalDocs] = useState(0);
   const itemsPerPage = 5;
   useEffect(() => {
      if (!isUpdateData) return;
      const fetchData = async () => {
         try {
            const result = await fetchActivities(currentPage, itemsPerPage);
            setActivities(result.docs);
            setTotalPages(result.totalPages);
            setTotalDocs(result.totalDocs);
            setIsUpdateData(false);
         } catch (error) {
            console.error('Error fetching activities:', error);
         }
      };

      fetchData();
   }, [isUpdateData, currentPage]);

   const handlePageChange = (page) => {
      setCurrentPage(page);
      setIsUpdateData(true);
   };
   const pages = [];
   for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
   }

   const [updatingActivity, setUpdatingActivity] = useState(null);

   const [showModalAdd, setShowModalAdd] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const openModalAdd = () => {
      setShowModalAdd(true);
   };
   const closeModalAdd = () => {
      setUpdatingActivity(null);
      setShowModalAdd(false);
   };
   const [showModalDelete, setShowModalDelete] = useState(false);
   const openModalDelete = (id) => {
      setSelectedId(id);
      setShowModalDelete(true);
   };
   const closeModalDelete = () => {
      setSelectedId(null);
      setShowModalDelete(false);
   };
   const [showModalEdit, setShowModalEdit] = useState(false);
   const openModalEdit = (id) => {
      setSelectedId(id);
      setUpdatingActivity(activities.find((activity) => activity._id === id));
      setShowModalEdit(true);
   };
   const closeModalEdit = () => {
      setSelectedId(null);
      setUpdatingActivity(null);
      setShowModalEdit(false);
   };

   const deleteActivity = async () => {
      try {
         if (isSelectCheckBoxes.length > 0) {
            await deleteActivitiesApi(isSelectCheckBoxes);
            setIsSelectCheckBoxes([]);
         } else {
            await deleteActivityApi(selectedId);
         }
         setIsUpdateData(true);
         closeModalDelete();
         toast.success('Activity deleted successfully');
      } catch (error) {
         toast.error('Failed to delete activity');
      }
   };

   const addActivity = async () => {
      if (!updatingActivity || !updatingActivity.name || !updatingActivity.image || !updatingActivity.date) {
         toast.error("Please enter activity's name ,image and date");
         return;
      }
      try {
         await createActivityApi(updatingActivity);
         setIsUpdateData(true);
         closeModalAdd();
         toast.success('Activity added successfully');
      } catch (error) {
         toast.error('Failed to add activity');
      }
   };

   const updateActivity = async () => {
      if (!updatingActivity || !updatingActivity.name || !updatingActivity.image || !updatingActivity.date) {
         toast.error("Please enter activity's name ,image and date");
         return;
      }
      try {
         await updateActivityApi(updatingActivity);
         setIsUpdateData(true);
         closeModalEdit();
         toast.success('Activity updated successfully');
      } catch (error) {
         toast.error('Failed to update activity');
      }
   };
   return (
      <div className={cx('content')}>
         <ToastContainer />
         <div className={cx('container')}>
            <div className={cx('table-responsive')}>
               <div className={cx('table-wrapper')}>
                  <div className={cx('table-title')}>
                     <div className={cx('row')}>
                        <div className={cx('item-row')}>
                           <h2>
                              Manage <b>Activities</b>
                           </h2>
                        </div>
                        <div className={cx('item-row')}>
                           <div className={cx('btn-danger')} onClick={openModalDelete}>
                              <i className={cx('material-icons')}>
                                 <FaMinusCircle />
                              </i>
                              <span>Delete</span>
                           </div>
                           <div className={cx('btn-success')} onClick={openModalAdd}>
                              <i className={cx('material-icons')}>
                                 <IoAddCircle />
                              </i>
                              <span>Add New Activity</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <table className={cx('table')}>
                     <thead>
                        <tr>
                           <th>
                              <span className={cx('custom-checkbox')}>
                                 <input
                                    type="checkbox"
                                    id="selectAll"
                                    checked={
                                       isSelectCheckBoxes.length !== 0 &&
                                       isSelectCheckBoxes.length === activities?.length
                                    }
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setIsSelectCheckBoxes(activities.map((activity) => activity._id));
                                       } else {
                                          setIsSelectCheckBoxes([]);
                                       }
                                    }}
                                 />
                                 <label for="selectAll"></label>
                              </span>
                           </th>
                           <th>Name</th>
                           <th>Image</th>
                           <th>Date</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {activities &&
                           activities?.map((activity) => (
                              <tr key={activity._id}>
                                 <td>
                                    <span className={cx('custom-checkbox')}>
                                       <input
                                          type="checkbox"
                                          id={`checkbox${activity._id}`}
                                          checked={isSelectCheckBoxes.includes(activity._id)}
                                          onChange={(e) => {
                                             console.log('e', activity._id, e.target.checked);
                                             if (e.target.checked) {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.concat(activity._id);
                                                });
                                             } else {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.filter((id) => id !== activity._id);
                                                });
                                             }
                                          }}
                                       />
                                       <label for={`checkbox${activity._id}`}></label>
                                    </span>
                                 </td>
                                 <td>{activity.name}</td>
                                 <td>
                                    <img className={cx('img-member')} src={activity.image}></img>
                                 </td>
                                 <td>{activity.date}</td>
                                 <td className={cx('icon-action')}>
                                    <div className={cx('icons-hover')} onClick={openModalEdit.bind(this, activity._id)}>
                                       <i className={cx('icons-edit')}>
                                          <CiEdit />
                                       </i>
                                       <div className={cx('edit')}>Edit</div>
                                    </div>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalDelete.bind(this, activity._id)}
                                    >
                                       <i className={cx('icons-delete')}>
                                          <MdDelete />
                                       </i>
                                       <div className={cx('delete')}>Delete</div>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
                  <div className={cx('clearfix')}>
                     <div className={cx('hint-text')}>
                        Showing <b>{(currentPage - 1) * itemsPerPage + (activities ? activities.length : 0)}</b> out of{' '}
                        <b>{totalDocs}</b> entries
                     </div>
                     <div className={cx('pagination')}>
                        <button
                           className={cx('btn-pag')}
                           onClick={() => handlePageChange(currentPage - 1)}
                           disabled={currentPage === 1}
                        >
                           Previous
                        </button>
                        {pages.map((page) => (
                           <button
                              className={cx('btn-pag', { activee: currentPage === page })}
                              key={page}
                              onClick={() => handlePageChange(page)}
                           >
                              {page}
                           </button>
                        ))}
                        <button
                           className={cx('btn-pag')}
                           onClick={() => handlePageChange(currentPage + 1)}
                           disabled={currentPage === totalPages}
                        >
                           Next
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {showModalAdd && (
            <div className={cx('modal')} onClick={closeModalAdd}>
               <div className={cx('modal-overlay')}></div>
               <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                  <div className={cx('modal-inner')}>
                     <form>
                        <div className={cx('modal-header')}>
                           <h4 className={cx('modal-title')}>Add Activity</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalAdd} />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Name:</label>
                              <input
                                 type="text"
                                 placeholder="Enter activity's name"
                                 required
                                 value={updatingActivity?.name || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingActivity?.image || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, image: e.target.value }))}
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Date:</label>
                              <textarea
                                 placeholder="Enter date's activity"
                                 required
                                 value={updatingActivity?.date || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, date: e.target.value }))}
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalAdd}>
                              Cancel
                           </div>
                           <div className={cx('btn-submit')} onClick={addActivity}>
                              Add
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
         {showModalEdit && (
            <div
               className={cx('modal')}
               onClick={() => {
                  closeModalEdit();
               }}
            >
               <div className={cx('modal-overlay')}></div>
               <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                  <div className={cx('modal-inner')}>
                     <form>
                        <div className={cx('modal-header')}>
                           <h4 className={cx('modal-title')}>Edit Activity</h4>
                           <AiOutlineClose
                              className={cx('btn-close')}
                              onClick={() => {
                                 closeModalEdit();
                              }}
                           />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Name:</label>
                              <input
                                 type="text"
                                 placeholder="Enter activity's name"
                                 required
                                 value={updatingActivity?.name || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingActivity?.image || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, image: e.target.value }))}
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Date:</label>
                              <textarea
                                 placeholder="Enter date's activity"
                                 required
                                 value={updatingActivity?.date || ''}
                                 onChange={(e) => setUpdatingActivity((prev) => ({ ...prev, date: e.target.value }))}
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div
                              className={cx('btn-cancel')}
                              onClick={() => {
                                 closeModalEdit();
                              }}
                           >
                              Cancel
                           </div>
                           <div className={cx('btn-save')} onClick={updateActivity}>
                              Save
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
         {showModalDelete && (
            <div className={cx('modal')} onClick={closeModalDelete}>
               <div className={cx('modal-overlay')}></div>
               <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                  <div className={cx('modal-inner')}>
                     <form>
                        <div className={cx('modal-header')}>
                           <h4 className={cx('modal-title')}>Delete Activity</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalDelete} />
                        </div>
                        <div className={cx('modal-body')}>
                           <p>Are you sure you want to delete these activities?</p>
                           <p className={cx('text-warning')}>
                              <small>This action cannot be undone.</small>
                           </p>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalDelete}>
                              Cancel
                           </div>
                           <div className={cx('btn-delete')} onClick={deleteActivity}>
                              Delete
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Activity;
