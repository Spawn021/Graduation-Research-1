//Student.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Student.module.scss';
import {
   fetchStudents,
   createStudentApi,
   deleteStudentApi,
   getStudent,
   updateStudentApi,
   deleteStudentsApi,
} from '~/services/students';
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
function Student() {
   // const { isLoggedIn } = useAuth();
   // if (!isLoggedIn) {
   //    return <Navigate to="/login" />;
   // }
   const [students, setStudents] = useState(null);
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
            const result = await fetchStudents(currentPage, itemsPerPage);
            setStudents(result.docs);
            setTotalPages(result.totalPages);
            setTotalDocs(result.totalDocs);
            setIsUpdateData(false);
         } catch (error) {
            console.error('Error fetching students:', error);
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

   const [updatingStudent, setUpdatingStudent] = useState(null);

   const [showModalAdd, setShowModalAdd] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const openModalAdd = () => {
      setShowModalAdd(true);
   };
   const closeModalAdd = () => {
      setUpdatingStudent(null);
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
      setUpdatingStudent(students.find((student) => student._id === id));
      setShowModalEdit(true);
   };
   const closeModalEdit = () => {
      setSelectedId(null);
      setUpdatingStudent(null);
      setShowModalEdit(false);
   };

   const deleteStudent = async () => {
      try {
         if (isSelectCheckBoxes.length > 0) {
            await deleteStudentsApi(isSelectCheckBoxes);
            setIsSelectCheckBoxes([]);
         } else {
            await deleteStudentApi(selectedId);
         }
         setIsUpdateData(true);
         closeModalDelete();
         toast.success('Student deleted successfully');
      } catch (error) {
         toast.error('Failed to delete student');
      }
   };

   const addStudent = async () => {
      if (!updatingStudent || !updatingStudent.name || !updatingStudent.image) {
         toast.error('Please enter student name and image link');
         return;
      }
      try {
         await createStudentApi(updatingStudent);
         setIsUpdateData(true);
         closeModalAdd();
         toast.success('Student added successfully');
      } catch (error) {
         toast.error('Failed to add student');
      }
   };

   const updateStudent = async () => {
      if (!updatingStudent || !updatingStudent.name || !updatingStudent.image) {
         toast.error('Please enter student name and image link');
         return;
      }
      try {
         await updateStudentApi(updatingStudent);
         setIsUpdateData(true);
         closeModalEdit();
         toast.success('Student updated successfully');
      } catch (error) {
         toast.error('Failed to update student');
      }
   };

   return (
      <div className={cx('content')}>
         <ToastContainer />
         <div className={cx('section')}>
            <span>Member </span>
            <span>/</span>
            <span> Student</span>
         </div>
         <div className={cx('container')}>
            <div className={cx('table-responsive')}>
               <div className={cx('table-wrapper')}>
                  <div className={cx('table-title')}>
                     <div className={cx('row')}>
                        <div className={cx('item-row')}>
                           <h2>
                              Manage <b>Students</b>
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
                              <span>Add New Student</span>
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
                                       isSelectCheckBoxes.length !== 0 && isSelectCheckBoxes.length === students?.length
                                    }
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setIsSelectCheckBoxes(students.map((student) => student._id));
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
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students &&
                           students?.map((student) => (
                              <tr key={student._id}>
                                 <td>
                                    <span className={cx('custom-checkbox')}>
                                       <input
                                          type="checkbox"
                                          id={`checkbox${student._id}`}
                                          checked={isSelectCheckBoxes.includes(student._id)}
                                          onChange={(e) => {
                                             console.log('e', student._id, e.target.checked);
                                             if (e.target.checked) {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.concat(student._id);
                                                });
                                             } else {
                                                setIsSelectCheckBoxes((prev) => {
                                                   const newArray = [...prev];
                                                   return newArray.filter((id) => id !== student._id);
                                                });
                                             }
                                          }}
                                       />
                                       <label for={`checkbox${student._id}`}></label>
                                    </span>
                                 </td>
                                 <td>{student.name}</td>
                                 <td>
                                    <img className={cx('img-member')} src={student.image}></img>
                                 </td>

                                 <td className={cx('icon-action')}>
                                    <div className={cx('icons-hover')} onClick={openModalEdit.bind(this, student._id)}>
                                       <i className={cx('icons-edit')}>
                                          <CiEdit />
                                       </i>
                                       <div className={cx('edit')}>Edit</div>
                                    </div>
                                    <div
                                       className={cx('icons-hover')}
                                       onClick={openModalDelete.bind(this, student._id)}
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
                        Showing <b>{(currentPage - 1) * itemsPerPage + (students ? students.length : 0)}</b> out of{' '}
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
                           <h4 className={cx('modal-title')}>Add Student</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalAdd} />
                        </div>
                        <div className={cx('modal-body')}>
                           <div className={cx('form-group')}>
                              <label>Name:</label>
                              <input
                                 type="text"
                                 placeholder="Enter Student's name"
                                 required
                                 value={updatingStudent?.name || ''}
                                 onChange={(e) => setUpdatingStudent((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingStudent?.image || ''}
                                 onChange={(e) => setUpdatingStudent((prev) => ({ ...prev, image: e.target.value }))}
                              ></textarea>
                           </div>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalAdd}>
                              Cancel
                           </div>
                           <div className={cx('btn-submit')} onClick={addStudent}>
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
                           <h4 className={cx('modal-title')}>Edit Student</h4>
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
                                 placeholder="Enter Student's name"
                                 required
                                 value={updatingStudent?.name || ''}
                                 onChange={(e) => setUpdatingStudent((prev) => ({ ...prev, name: e.target.value }))}
                              ></input>
                           </div>
                           <div className={cx('form-group')}>
                              <label>Image:</label>
                              <textarea
                                 placeholder="Enter image's link"
                                 required
                                 value={updatingStudent?.image || ''}
                                 onChange={(e) => setUpdatingStudent((prev) => ({ ...prev, image: e.target.value }))}
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
                           <div className={cx('btn-save')} onClick={updateStudent}>
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
                           <h4 className={cx('modal-title')}>Delete Student</h4>
                           <AiOutlineClose className={cx('btn-close')} onClick={closeModalDelete} />
                        </div>
                        <div className={cx('modal-body')}>
                           <p>Are you sure you want to delete these students?</p>
                           <p className={cx('text-warning')}>
                              <small>This action cannot be undone.</small>
                           </p>
                        </div>
                        <div className={cx('modal-footer')}>
                           <div className={cx('btn-cancel')} onClick={closeModalDelete}>
                              Cancel
                           </div>
                           <div className={cx('btn-delete')} onClick={deleteStudent}>
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

export default Student;
