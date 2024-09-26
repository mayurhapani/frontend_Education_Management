import { useState, useEffect } from "react";
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [courseData, setCourseData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    teacher: initialData.teacher || "",
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/getTeachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachers(response.data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(courseData);
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Course Title"
        name="title"
        value={courseData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={courseData.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="teacher-select-label">Teacher</InputLabel>
        <Select
          labelId="teacher-select-label"
          id="teacher-select"
          name="teacher"
          value={courseData.teacher}
          label="Teacher"
          onChange={handleChange}
          required
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher._id} value={teacher._id}>
              {teacher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Save Course
      </Button>
    </Box>
  );
};

CourseForm.propTypes = {
  onSubmit: PropTypes.func,
  initialData: PropTypes.object,
};

export default CourseForm;
