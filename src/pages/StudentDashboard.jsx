import { Container, Typography, Grid, Paper } from "@mui/material";
import CourseList from "../components/CourseList";
import GradeList from "../components/GradeList";

const StudentDashboard = () => {
  return (
    <Container maxWidth="lg" className="mt-10">
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <CourseList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Grades
            </Typography>
            <GradeList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
