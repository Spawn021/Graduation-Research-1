import { fetchApi } from './index';
export const fetchActivitiesHome = async () => {
   return (await fetchApi(`/activities/home`)).activities;
};
export const fetchActivities = async (page, limit) => {
   return await fetchApi(`/activities?page=${page}&limit=${limit}`);
};
export const getActivity = async (id) => {
   return await fetchApi(`/activities/${id}`);
};

export const createActivityApi = async (activity) => {
   console.log('acitivity', activity);
   return await fetchApi(`/activities`, {
      method: 'POST',
      body: JSON.stringify(activity),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const updateActivityApi = async (activity) => {
   return await fetchApi(`/activities/${activity._id}`, {
      method: 'PUT',
      body: JSON.stringify(activity),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};

export const deleteActivityApi = async (id) => {
   return await fetchApi(`/activities/${id}`, {
      method: 'DELETE',
   });
};

export const deleteActivitiesApi = async (ids) => {
   return await fetchApi(`/activities`, {
      method: 'DELETE',
      body: JSON.stringify(ids),
      headers: {
         'Content-Type': 'application/json',
      },
   });
};
