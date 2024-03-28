import axios from 'axios';
import config from '../../../../config';

export const gradeOptimizerHttp = axios.create({
  baseURL: config.REACT_APP_GRADE_OPTIMIZER_URL,
});

export const subjectsHttp = axios.create({
  baseURL: config.REACT_APP_SUBJECTS_URL,
});
