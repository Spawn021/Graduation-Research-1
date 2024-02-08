import { fetchApi } from './index';

export const fetchInstructors = async (name) => {
   return (await fetchApi(`/instructors?name=${name}`)).instructors;
};

export const fetchInstructorMembers = async () => {
   return (await fetchApi(`/instructors/member`)).instructors;
};

export const fetchInstructor = async (id) => {
   return await fetchApi(`/instructors/${id}`);
};
export const fetchInstructorr = async (page, limit) => {
   return await fetchApi(`/instructors/admin?page=${page}&limit=${limit}`);
};
export const getInstructor = async (id) => {
   return await fetchApi(`/instructors/${id}`);
};

export const createInstructorApi = async (instructor) => {
   console.log('instructor', instructor);
   return await fetchApi(`/instructors`, {
      method: 'POST',
      body: JSON.stringify(instructor),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const updateInstructorApi = async (instructor) => {
   return await fetchApi(`/instructors/${instructor._id}`, {
      method: 'PUT',
      body: JSON.stringify(instructor),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const deleteInstructorApi = async (id) => {
   return await fetchApi(`/instructors/${id}`, {
      method: 'DELETE',
   });
};

export const deleteInstructorsApi = async (ids) => {
   return await fetchApi(`/instructors`, {
      method: 'DELETE',
      body: JSON.stringify(ids),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};
