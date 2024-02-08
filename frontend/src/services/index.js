export const fetchApi = async (path, options) => {
   try {
      const response = await fetch(`${api}${path}`, options);
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error:', error);
      return null;
   }
};

const api = 'http://localhost:8001/api';
