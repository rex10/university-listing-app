import axios from 'axios';

const API_URL = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';

const getUniversities = async (params = {}) => {
    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

export default getUniversities