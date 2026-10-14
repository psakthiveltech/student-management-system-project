import axios from 'axios'

const Mark_APi = axios.create({
  "baseURL":"http://localhost:8080/marks",
  "Content-Type":"application/json"
  
})

export const getAllMarks=()=>{
  return Mark_APi.get("");
}

export const getMarkById=(id)=>{
  return Mark_APi.get(`/${id}`);
}

export const createMark=(mark)=>{
  return Mark_APi.post("",mark);
}

export const updateMarkById=(id,mark)=>{
  return Mark_APi.put(`/${id}`,mark);
}

export const deleteMarkById=(id)=>{
  return Mark_APi.delete(`/${id}`);
}

export const getByStudentId=(id)=>{
  return Mark_APi.get(`/getByStudentId/${id}`);
}