import axios from 'axios'

const Subject_APi = axios.create({
  "baseURL":"http://localhost:8080/subject",
  "Content-Type":"application/json"
  
})

export const getAllSubject=()=>{
  return Subject_APi.get("");
}

export const getSubjectById=(id)=>{
  return Subject_APi.get(`/${id}`);
}

export const createSubject=(subject)=>{
  return Subject_APi.post("",subject);
}

export const updateSubjectById=(id,subject)=>{
  return Subject_APi.put(`/${id}`,subject);
}

export const deleteSubjectById=(id)=>{
  return Subject_APi.delete(`/${id}`);
}

export const getSubjectByCourseIdAndSemester=(courseId,semesterId)=>{
  return Subject_APi.get(`/getByCourseId/${courseId}/semester/${semesterId}`);
}

export const getSubjectByCourse=(courseId)=>{
  return Subject_APi.get(`/getByCourseId/${courseId}`);
}
