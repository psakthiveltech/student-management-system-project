import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SvgIcon,
  Stack,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Custom Cog Icon for Edit
function CogIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    </SvgIcon>
  );
}

export default function StudentForm() {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [studentRecord, setStudentRecord] = useState("");

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [studentId, setStudentId] = useState("");

  const [updateStudentName, setUpdateStudentName] = useState("");
  const [updateStudentCourse, setUpdateStudentCourse] = useState("");
  const [updateStudentAge, setUpdateStudentAge] = useState("");
  const [updateStudentRecord, setUpdateStudentRecord] = useState("");

  const navigate = useNavigate();

  const getStudent = async () => {
    try {
      const response = await fetch("http://localhost:8080/student");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      studentName,
      course,
      age: Number(age),
      studentRecord,
    };

    try {
      await fetch("http://localhost:8080/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStudentName("");
      setCourse("");
      setAge("");
      setStudentRecord("");
      getStudent();
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const getStudentById = async () => {
    if (!studentId) return;
    try {
      const response = await fetch(`http://localhost:8080/student/${studentId}`);
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const updateStudentdata = async () => {
    const updatedStudent = {
      studentName: updateStudentName,
      course: updateStudentCourse,
      age: Number(updateStudentAge),
      studentRecord: updateStudentRecord,
    };

    try {
      await fetch(`http://localhost:8080/student/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      getStudent();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteById = async (id) => {
    try {
      await fetch(`http://localhost:8080/student/${id}`, { method: "DELETE" });
      getStudent();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          
          
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Add Student
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Student Record"
                  value={studentRecord}
                  onChange={(e) => setStudentRecord(e.target.value)}
                  required
                />
              </Stack>
              <Button type="submit" variant="contained" color="primary" size="large">
                Add Student
              </Button>
            </Box>
          </Paper>

          {/* Search Student Section */}
          <Paper elevation={15} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Search Student
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ maxWidth: 450 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={getStudentById}>
                Search
              </Button>
            </Stack>

            {student && (
              <Box sx={{ mt: 2, p: 2, bgcolor: '#f1f5f9', borderRadius: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">Found Student:</Typography>
                <Typography variant="body2">ID: {student.id} | Name: {student.studentName} | Course: {student.course} | Age: {student.age}</Typography>
              </Box>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Student List
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} size="small" aria-label="student table">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Student Name</strong></TableCell>
                    <TableCell><strong>Course Id</strong></TableCell>
                    <TableCell><strong>Age</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No students available</TableCell>
                    </TableRow>
                  ) : (
                    students.map((item) => (
                      <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">#{item.id}</TableCell>
                        <TableCell>{item.studentName}</TableCell>
                        <TableCell>{item.courseId}</TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<CogIcon />}
                              onClick={() => navigate(`/edit/${item.id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteById(item.id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Update Student Section */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Update Student Details
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Target Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Name"
                  value={updateStudentName}
                  onChange={(e) => setUpdateStudentName(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Course"
                  value={updateStudentCourse}
                  onChange={(e) => setUpdateStudentCourse(e.target.value)}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="New Age"
                  value={updateStudentAge}
                  onChange={(e) => setUpdateStudentAge(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Record"
                  value={updateStudentRecord}
                  onChange={(e) => setUpdateStudentRecord(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ minWidth: 160 }}
                  onClick={updateStudentdata}
                >
                  Save Update
                </Button>
              </Stack>
            </Stack>
          </Paper>

        </Stack>
      </Container>
    </React.Fragment>
  );
}