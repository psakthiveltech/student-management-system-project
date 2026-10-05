import axios from "axios";

const parentApi = axios.create({
  'baseURL':'http://localhost:8080/parents',
  'Content-Type':'application/json'
});

export const getAllParents=()=>{
  return parentApi.get('');
}

export const getParentsById=(id)=>{
  return parentApi.get(`/${id}`);
}

export const createParents=(parents)=>{
  return parentApi.post('',parents);
}

export const updateParentsById=(id,parents)=>{
  return parentApi.put(`/${id}`,parents);
}

export const deleteParentsById=(id)=>{
  return parentApi.delete(`/${id}`);
}

export const deleteAllParents=()=>{
  return parentApi.delete('');
}