//Instructor.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Instructor.module.scss';
import {
   fetchInstructorr,
   createInstructorApi,
   deleteInstructorApi,
   getInstructor,
   updateInstructorApi,
   deleteInstructorsApi,
} from '~/services/instructors';
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
function Instructor() {
   // const { isLoggedIn } = useAuth();
   // if (!isLoggedIn) {
   //    return <Navigate to="/login" />;
   // }
   const [instructors, setInstructors] = useState(null);
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
            const result = await fetchInstructorr(currentPage, itemsPerPage);
            setInstructors(result.docs);
            setTotalPages(result.totalPages);
            setTotalDocs(result.totalDocs);
            setIsUpdateData(false);
         } catch (error) {
            console.error('Error fetching instructors:', error);
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
   const [updatingInstructor, setUpdatingInstructor] = useState(null);
   const [showModalAdd, setShowModalAdd] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const openModalAdd = () => {
      setShowModalAdd(true);
   };
   const closeModalAdd = () => {
      setUpdatingInstructor(null);
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
      setUpdatingInstructor(instructors.find((instructor) => instructor._id === id));
      setShowModalEdit(true);
   };
   const closeModalEdit = () => {
      setSelectedId(null);
      setUpdatingInstructor(null);
      setShowModalEdit(false);
   };
   const deleteInstructor = async () => {
      if (isSelectCheckBoxes.length > 0) {
         await deleteInstructorsApi(isSelectCheckBoxes);
         setIsSelectCheckBoxes([]);
      } else {
         await deleteInstructorApi(selectedId);
      }
      setIsUpdateData(true);
      closeModalDelete();
   };

   const addInstructor = async () => {
      if (
         !updatingInstructor ||
         !updatingInstructor.name ||
         !updatingInstructor.image ||
         !updatingInstructor.intro ||
         !updatingInstructor.positions ||
         !updatingInstructor.degrees ||
         !updatingInstructor.email ||
         !updatingInstructor.researchInterests ||
         !updatingInstructor.researchProjects ||
         !updatingInstructor.studyInterests ||
         !updatingInstructor.prizes ||
         !updatingInstructor.teachings
      ) {
         toast.error("Please enter instructor's fields fully and correctly");
         return;
      }
      try {
         await createInstructorApi(updatingInstructor);
         setIsUpdateData(true);
         closeModalAdd();
         toast.success('Instructor added successfully');
      } catch (error) {
         toast.error('Failed to add instructor');
      }
   };

   const updateInstructor = async () => {
      if (
         !updatingInstructor ||
         !updatingInstructor.name ||
         !updatingInstructor.image ||
         !updatingInstructor.intro ||
         !updatingInstructor.positions ||
         !updatingInstructor.degrees ||
         !updatingInstructor.email ||
         !updatingInstructor.researchInterests ||
         !updatingInstructor.researchProjects ||
         !updatingInstructor.studyInterests ||
         !updatingInstructor.prizes ||
         !updatingInstructor.teachings
      ) {
         toast.error("Please enter instructor's fields fully and correctly");
         return;
      }
      try {
         await updateInstructorApi(updatingInstructor);
         setIsUpdateData(true);
         closeModalEdit();
         toast.success('Instructor updated successfully');
      } catch (error) {
         toast.error('Failed to update instructor');
      }
   };
   return (
      <div className={cx('content')}>
         <ToastContainer />
         <div className={cx('section')}>
            <span>Member </span>
            <span>/</span>
            <span> Instructor</span>
         </div>
         <div className={cx('container')}>
            <div className={cx('table-responsive')}>
               <div className={cx('table-wrapper')}>
                  <div className={cx('table-title')}>
                     <div className={cx('row')}>
                        <div className={cx('item-row')}>
                           <h2>
                              Manage <b>Instructors</b>
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
                              <span>Add New Instructor</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={cx('tablecss')}>
                     <thead>
                        <tr>
                           <th>
                              <span className={cx('custom-checkbox')}>
                                 <input
                                    type="checkbox"
                                    id="selectAll"
                                    checked={
                                       isSelectCheckBoxes.length !== 0 &&
                                       isSelectCheckBoxes.length === instructors?.length
                                    }
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setIsSelectCheckBoxes(instructors.map((instructor) => instructor._id));
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
                           <th>Introduction</th>
                           <th>Position</th>
                           <th>Degree</th>
                           <th>Email</th>
                           <th>Research Interests</th>
                           <th>Research Projects</th>
                           <th>Study Interests</th>
                           <th>Prize</th>
                           <th>Teaching</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {instructors &&
                           instructors?.map((instructor) => (
                              <tr key={instructor._id}>
                                 <td>
                                    <span className={cx('custom-checkbox')}>
                                       <input
                                          type="checkbox"
                                          id={`checkbox${instructor._id}`}
                                          checked={isSelectCheckBoxes.includes(instructor._id)}
                                          onChange={(e) => {
                                             console.log('e', instructor._id, e.target.checked);
                                             if (e.target.checked) {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.concat(instructor._id);
                                                });
                                             } else {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.filter((id) => id !== instructor._id);
                                                });
                                             }
                                          }}
                                       />
                                       <label for={`checkbox${instructor._id}`}></label>
                                    </span>
                                 </td>
                                 <td>{instructor.name}</td>
                                 <td>
                                    <img className={cx('img-member')} src={instructor.image}></img>
                                 </td>

                                 <td>
                                    {instructor.intro[0].substring(0, 20)}
                                    {instructor.intro[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.positions[0].substring(0, 20)}
                                    {instructor.positions[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.degrees[0].substring(0, 20)}
                                    {instructor.degrees[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.studyInterests[0].substring(0, 20)}
                                    {instructor.studyInterests[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.researchProjects[0].substring(0, 20)}
                                    {instructor.researchProjects[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.email.substring(0, 20)}
                                    {instructor.email.length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.researchInterests[0].substring(0, 20)}
                                    {instructor.researchInterests[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.prizes[0].substring(0, 20)}
                                    {instructor.prizes[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td>
                                    {instructor.teachings[0].substring(0, 20)}
                                    {instructor.teachings[0].length > 20 ? '...' : ''}
                                 </td>
                                 <td className={cx('icon-action')}>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalEdit.bind(this, instructor._id)}
                                    >
                                       <i className={cx('icons-edit')}>
                                          <CiEdit />
                                       </i>
                                       <div className={cx('edit')}>Edit</div>
                                    </div>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalDelete.bind(this, instructor._id)}
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
                  </div>
                  <div className={cx('clearfix')}>
                     <div className={cx('hint-text')}>
                        Showing <b>{(currentPage - 1) * itemsPerPage + (instructors ? instructors.length : 0)}</b> out
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
                           <h4 className={cx('modal-title')}>Add Instructor</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalAdd} />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Name:</label>
                              <input
                                 type="text"
                                 placeholder="Enter Instructor's name"
                                 required
                                 value={updatingInstructor?.name || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingInstructor?.image || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, image: e.target.value }))}
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Introduction:</label>
                              <textarea
                                 placeholder="Enter Instructor's introduction"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.intro
                                       ? updatingInstructor.intro.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, intro: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Position:</label>
                              <textarea
                                 placeholder="Enter Instructor's position"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.positions
                                       ? updatingInstructor.positions.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       positions: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Degree:</label>
                              <textarea
                                 placeholder="Enter Instructor's degree"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.degrees
                                       ? updatingInstructor.degrees.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, degrees: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Email:</label>
                              <input
                                 type="text"
                                 placeholder="Enter Instructor's email "
                                 required
                                 value={updatingInstructor?.email || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, email: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Research Interests:</label>
                              <textarea
                                 placeholder="Enter Instructor's research interest"
                                 value={updatingInstructor?.researchInterests || ''}
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, researchInterests: e.target.value }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Study Interests</label>
                              <textarea
                                 placeholder="Enter Instructor's study interests"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.studyInterests
                                       ? updatingInstructor.studyInterests.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       studyInterests: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Research Projects</label>
                              <textarea
                                 placeholder="Enter Instructor's research projects"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.researchProjects
                                       ? updatingInstructor.researchProjects.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       researchProjects: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Prizes:</label>
                              <textarea
                                 placeholder="Enter Instructor's prizes"
                                 value={
                                    updatingInstructor && updatingInstructor.prizes
                                       ? updatingInstructor.prizes.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, prizes: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Teachings:</label>
                              <textarea
                                 placeholder="Enter Instructor's teachings"
                                 value={
                                    updatingInstructor && updatingInstructor.teachings
                                       ? updatingInstructor.teachings.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       teachings: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalAdd}>
                              Cancel
                           </div>
                           <div className={cx('btn-submit')} onClick={addInstructor}>
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
                           <h4 className={cx('modal-title')}>Edit Instructor</h4>
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
                                 placeholder="Enter Instructor's name"
                                 required
                                 value={updatingInstructor?.name || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingInstructor?.image || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, image: e.target.value }))}
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Introduction:</label>
                              <textarea
                                 placeholder="Enter Instructor's introduction"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.intro
                                       ? updatingInstructor.intro.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, intro: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Position:</label>
                              <textarea
                                 placeholder="Enter Instructor's position"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.positions
                                       ? updatingInstructor.positions.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       positions: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Degree:</label>
                              <textarea
                                 placeholder="Enter Instructor's degree"
                                 required
                                 value={
                                    updatingInstructor && updatingInstructor.degrees
                                       ? updatingInstructor.degrees.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, degrees: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Email:</label>
                              <input
                                 type="text"
                                 placeholder="Enter Instructor's email"
                                 required
                                 value={updatingInstructor?.email || ''}
                                 onChange={(e) => setUpdatingInstructor((prev) => ({ ...prev, email: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Research Projects:</label>
                              <textarea
                                 placeholder="Enter Instructor's research project"
                                 value={
                                    updatingInstructor && updatingInstructor.researchProjects
                                       ? updatingInstructor.researchProjects.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       researchProjects: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Study Interests:</label>
                              <textarea
                                 placeholder="Enter Instructor's study interest"
                                 value={
                                    updatingInstructor && updatingInstructor.studyInterests
                                       ? updatingInstructor.studyInterests.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       studyInterests: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Research Interests:</label>
                              <textarea
                                 placeholder="Enter Instructor's research interest"
                                 value={
                                    updatingInstructor && updatingInstructor.researchInterests
                                       ? updatingInstructor.researchInterests.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       researchInterests: e.target.value.split('\n'),
                                    }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Prizes:</label>
                              <textarea
                                 placeholder="Enter Instructor's prizes"
                                 value={
                                    updatingInstructor && updatingInstructor.prizes
                                       ? updatingInstructor.prizes.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({ ...prev, prizes: e.target.value.split('\n') }))
                                 }
                              ></textarea>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Teachings:</label>
                              <textarea
                                 placeholder="Enter Instructor's teachings"
                                 value={
                                    updatingInstructor && updatingInstructor.teachings
                                       ? updatingInstructor.teachings.join('\n')
                                       : ''
                                 }
                                 onChange={(e) =>
                                    setUpdatingInstructor((prev) => ({
                                       ...prev,
                                       teachings: e.target.value.split('\n'),
                                    }))
                                 }
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
                           <div className={cx('btn-save')} onClick={updateInstructor}>
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
                           <h4 className={cx('modal-title')}>Delete Instructor</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalDelete} />
                        </div>
                        <div className={cx('modal-body')}>
                           <p>Are you sure you want to delete these instructors?</p>
                           <p className={cx('text-warning')}>
                              <small>This action cannot be undone.</small>
                           </p>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalDelete}>
                              Cancel
                           </div>
                           <div className={cx('btn-delete')} onClick={deleteInstructor}>
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

export default Instructor;
