//Publication.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PublicationAdmin.module.scss';
import {
   fetchPublicationAdmins,
   createPublicationApi,
   deletePublicationApi,
   getPublication,
   updatePublicationApi,
   deletePublicationsApi,
} from '~/services/publications';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { useAuth } from '~/store/AuthContext';
// import { Navigate } from 'react-router-dom';
import { IoAddCircle } from 'react-icons/io5';
import { FaMinusCircle } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
const cx = classNames.bind(styles);
function Publication() {
   // const { isLoggedIn } = useAuth();
   // if (!isLoggedIn) {
   //    return <Navigate to="/login" />;
   // }
   const [publications, setPublications] = useState(null);
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
            const result = await fetchPublicationAdmins(currentPage, itemsPerPage);
            setPublications(result.docs);
            setTotalPages(result.totalPages);
            setTotalDocs(result.totalDocs);
            setIsUpdateData(false);
         } catch (error) {
            console.error('Error fetching publications:', error);
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

   const [updatingPublication, setUpdatingPublication] = useState(null);

   const [showModalAdd, setShowModalAdd] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const openModalAdd = () => {
      setShowModalAdd(true);
   };
   const closeModalAdd = () => {
      setUpdatingPublication(null);
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
      setUpdatingPublication(publications.find((publication) => publication._id === id));
      setShowModalEdit(true);
   };
   const closeModalEdit = () => {
      setSelectedId(null);
      setUpdatingPublication(null);
      setShowModalEdit(false);
   };

   const deletePublication = async () => {
      try {
         if (isSelectCheckBoxes.length > 0) {
            await deletePublicationsApi(isSelectCheckBoxes);
            setIsSelectCheckBoxes([]);
         } else {
            await deletePublicationApi(selectedId);
         }
         setIsUpdateData(true);
         closeModalDelete();
         toast.success('Publication deleted successfully');
      } catch (error) {
         toast.error('Failed to delete publication');
      }
   };

   const addPublication = async () => {
      if (!updatingPublication || !updatingPublication.names || !updatingPublication.year) {
         toast.error("Please enter publication's names and year");
         return;
      }
      try {
         await createPublicationApi(updatingPublication);
         setIsUpdateData(true);
         closeModalAdd();
         toast.success('Publication added successfully');
      } catch (error) {
         toast.error('Failed to add publication');
      }
   };

   const updatePublication = async () => {
      if (!updatingPublication || !updatingPublication.names || !updatingPublication.year) {
         toast.error("Please enter publication's names and year");
         return;
      }
      try {
         await updatePublicationApi(updatingPublication);
         setIsUpdateData(true);
         closeModalEdit();
         toast.success('Publication updated successfully');
      } catch (error) {
         toast.error('Failed to update publication');
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
                              Manage <b>Publications</b>
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
                              <span>Add New Publication</span>
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
                                       isSelectCheckBoxes.length === publications?.length
                                    }
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setIsSelectCheckBoxes(publications.map((publication) => publication._id));
                                       } else {
                                          setIsSelectCheckBoxes([]);
                                       }
                                    }}
                                 />
                                 <label for="selectAll"></label>
                              </span>
                           </th>
                           <th>Year</th>
                           <th>Names</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {publications &&
                           publications?.map((publication) => (
                              <tr key={publication._id}>
                                 <td>
                                    <span className={cx('custom-checkbox')}>
                                       <input
                                          type="checkbox"
                                          id={`checkbox${publication._id}`}
                                          checked={isSelectCheckBoxes.includes(publication._id)}
                                          onChange={(e) => {
                                             console.log('e', publication._id, e.target.checked);
                                             if (e.target.checked) {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.concat(publication._id);
                                                });
                                             } else {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.filter((id) => id !== publication._id);
                                                });
                                             }
                                          }}
                                       />
                                       <label for={`checkbox${publication._id}`}></label>
                                    </span>
                                 </td>

                                 <td>{publication.year}</td>
                                 <td>
                                    {publication.names[0].substring(0, 100)}
                                    {publication.names[0].length > 100 ? '...' : ''}
                                 </td>

                                 <td className={cx('icon-action')}>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalEdit.bind(this, publication._id)}
                                    >
                                       <i className={cx('icons-edit')}>
                                          <CiEdit />
                                       </i>
                                       <div className={cx('edit')}>Edit</div>
                                    </div>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalDelete.bind(this, publication._id)}
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
                        Showing <b>{(currentPage - 1) * itemsPerPage + (publications ? publications.length : 0)}</b> out
                        of <b>{totalDocs}</b> entries
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
                           <h4 className={cx('modal-title')}>Add Publication</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalAdd} />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Year:</label>
                              <input
                                 type="text"
                                 placeholder="Enter publication's year"
                                 required
                                 value={updatingPublication?.year || ''}
                                 onChange={(e) => setUpdatingPublication((prev) => ({ ...prev, year: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Names:</label>
                              <textarea
                                 placeholder="Enter publication's names"
                                 value={
                                    updatingPublication && updatingPublication.names
                                       ? updatingPublication.names.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingPublication((prev) => ({
                                       ...prev,
                                       names: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalAdd}>
                              Cancel
                           </div>
                           <div className={cx('btn-submit')} onClick={addPublication}>
                              Add
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
         {showModalEdit && (
            <div className={cx('modal')} onClick={closeModalEdit}>
               <div className={cx('modal-overlay')}></div>
               <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                  <div className={cx('modal-inner')}>
                     <form>
                        <div className={cx('modal-header')}>
                           <h4 className={cx('modal-title')}>Edit Publication</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalEdit} />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Year:</label>
                              <input
                                 type="text"
                                 placeholder="Enter publication's year"
                                 required
                                 value={updatingPublication?.year || ''}
                                 onChange={(e) => setUpdatingPublication((prev) => ({ ...prev, year: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Names:</label>
                              <textarea
                                 placeholder="Enter publication's names"
                                 value={
                                    updatingPublication && updatingPublication.names
                                       ? updatingPublication.names.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingPublication((prev) => ({
                                       ...prev,
                                       names: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalEdit}>
                              Cancel
                           </div>
                           <div className={cx('btn-save')} onClick={updatePublication}>
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
                           <h4 className={cx('modal-title')}>Delete Publication</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalDelete} />
                        </div>
                        <div className={cx('modal-body')}>
                           <p>Are you sure you want to delete these publications?</p>
                           <p className={cx('text-warning')}>
                              <small>This action cannot be undone.</small>
                           </p>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalDelete}>
                              Cancel
                           </div>
                           <div className={cx('btn-delete')} onClick={deletePublication}>
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

export default Publication;
