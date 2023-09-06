import axios from 'axios';
import config from '../../../../config';

export const http = axios.create({
  baseURL: config.REACT_APP_GRADE_OPTIMIZER_URL,
});
