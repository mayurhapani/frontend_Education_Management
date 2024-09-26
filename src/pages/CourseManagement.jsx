import { useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  const handleSubmit = async (courseData) => {
    try {
      const response = await axios.post(`${BASE_URL}/courses/createCourse`, courseData);
      setCourses([...courses, response.data.data]);
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Failed to create course");
      console.error("Error creating course:", error);
    }
  };

  return (
    <Container maxWidth="lg" className="mt-10">
      <Typography variant="h4" gutterBottom>
        Course Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Add/Edit Course
            </Typography>
            <CourseForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <CourseList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseManagement;
