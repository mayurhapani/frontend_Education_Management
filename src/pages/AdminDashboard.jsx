import { Container, Typography, Grid, Paper } from "@mui/material";
import CourseList from "../components/CourseList";
import StudentList from "../components/StudentList";
import TeacherList from "../components/TeacherList";

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg" className="mt-10">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <CourseList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Students
            </Typography>
            <StudentList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" gutterBottom>
              Teachers
            </Typography>
            <TeacherList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
