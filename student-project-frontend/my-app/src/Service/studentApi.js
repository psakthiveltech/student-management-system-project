import axios from "axios";

const apiClient = axios.create({
  'baseURL':'http://localhost:8080/student',
  'headers':{
    'Content-Type':'application/json'
  }
})

export const getAllStudents=()=>{
  return apiClient.get('');
}

export const getStudentById=(id)=>{
  return apiClient.get(`${id}`);
}

export const createStudent=(studentData)=>{
  return apiClient.post('',studentData);
}

export const updateStudent=(id,studentNewData)=>{
  return apiClient.put(`/${id}`,studentNewData);
}

export const deleteStudentById=(id)=>{
  return apiClient.delete(`/${id}`);
}

export const deleteAllStudent=()=>{
  return apiClient.delete('');
}

export const getStudendsByName = (name)=> apiClient.get(`/student-Name/${name}`);

export const getStudentByCourse = (course) => apiClient.get(`/course/${course}`);

export const getStudentsByParentsId =(id) => apiClient.get(`/parentId/${id}`);