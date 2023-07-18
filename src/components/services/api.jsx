import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36562958-7e80c6ba0d10c58cc9a50a36e';

export const fetchImages = async (searchValue, currentPage) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${searchValue}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
