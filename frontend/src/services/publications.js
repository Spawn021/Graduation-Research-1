import { fetchApi } from './index';
export const fetchPublications = async (name) => {
   return await fetchApi(`/publications`);
};

export const fetchPublicationAdmins = async (page, limit) => {
   return await fetchApi(`/publications/admin?page=${page}&limit=${limit}`);
};
export const getPublication = async (id) => {
   return await fetchApi(`/publications/${id}`);
};

export const createPublicationApi = async (publication) => {
   console.log('publication', publication);
   return await fetchApi(`/publications`, {
      method: 'POST',
      body: JSON.stringify(publication),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const updatePublicationApi = async (publication) => {
   return await fetchApi(`/publications/${publication._id}`, {
      method: 'PUT',
      body: JSON.stringify(publication),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const deletePublicationApi = async (id) => {
   return await fetchApi(`/publications/${id}`, {
      method: 'DELETE',
   });
};

export const deletePublicationsApi = async (ids) => {
   return await fetchApi(`/publications`, {
      method: 'DELETE',
      body: JSON.stringify(ids),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};
