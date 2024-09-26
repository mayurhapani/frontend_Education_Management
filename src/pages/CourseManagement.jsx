import { Container, Typography, Grid, Paper } from "@mui/material";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

const CourseManagement = () => {
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
            <CourseForm />
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
