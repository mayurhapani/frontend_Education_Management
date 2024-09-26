import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from 'prop-types';

const CourseForm = ({ onSubmit, initialData = {} }) => {
  const [courseData, setCourseData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(courseData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Course Name"
        name="name"
        value={courseData.name || ""}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={courseData.description || ""}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Course
      </Button>
    </Box>
  );
};

CourseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object
};

export default CourseForm;
