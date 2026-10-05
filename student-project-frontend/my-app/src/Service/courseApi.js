import axios from "axios";

const courseApi = axios.create({
  'baseURL' : 'http://localhost:8080/course',
  'Content-Type':'application/json'
})

export const getAllCourse=()=>{
  return courseApi.get('');
}

export const getCourseById=(id)=>{
  return courseApi.get(`/${id}`);
}

export const createCourse=(course)=>{
  return courseApi.post('',course);
}

export const updateCourse=(id,course)=>{
  return courseApi.put(`/${id}`,course);
}

export const deleteCourseById=(id)=>{
  return courseApi.delete(`/${id}`);
}