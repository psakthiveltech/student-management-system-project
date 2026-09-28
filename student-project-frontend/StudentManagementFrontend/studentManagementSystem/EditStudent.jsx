import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from '@mui/material';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [studentRecord, setStudentRecord] = useState("");

  const getStudentById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/student/${id}`);
      const data = await response.json();

      setStudentName(data.studentName || "");
      setCourse(data.course || "");
      setAge(data.age || "");
      setStudentRecord(data.studentRecord || "");
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  useEffect(() => {
    getStudentById();
  }, [id]);

  const updateStudent = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      studentName,
      course,
      age: Number(age),
      studentRecord,
    };

    try {
      await fetch(`http://localhost:8080/student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Edit Student Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Updating records for Student ID: #{id}
          </Typography>

          <Box component="form" onSubmit={updateStudent}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                variant="outlined"
                label="Full Name"
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
                type="number"
                label="Age"
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

              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="outlined" color="inherit" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}