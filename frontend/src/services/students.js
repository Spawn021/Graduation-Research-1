import { fetchApi } from './index';
export const fetchStudents = async (page, limit) => {
   return await fetchApi(`/students?page=${page}&limit=${limit}`);
};
export const fetchStudentMembers = async () => {
   return (await fetchApi(`/students/member`)).students;
};
export const getStudent = async (id) => {
   return await fetchApi(`/students/${id}`);
};

export const createStudentApi = async (student) => {
   console.log('student', student);
   return await fetchApi(`/students`, {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const updateStudentApi = async (student) => {
   return await fetchApi(`/students/${student._id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const deleteStudentApi = async (id) => {
   return await fetchApi(`/students/${id}`, {
      method: 'DELETE',
   });
};

export const deleteStudentsApi = async (ids) => {
   return await fetchApi(`/students`, {
      method: 'DELETE',
      body: JSON.stringify(ids),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};
