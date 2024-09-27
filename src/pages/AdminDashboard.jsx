import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { useState } from "react";
import CourseList from "../components/CourseList";
import StudentList from "../components/StudentList";
import TeacherList from "../components/TeacherList";
import AssignmentList from "../components/AssignmentList";

const AdminDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom component="h2">
              Teachers
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <TeacherList refreshKey={refreshKey} onRefresh={handleRefresh} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom component="h2">
              Students
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <StudentList refreshKey={refreshKey} onRefresh={handleRefresh} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom component="h2">
              Courses
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <CourseList refreshKey={refreshKey} onRefresh={handleRefresh} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom component="h2">
              Assignments
            </Typography>
            <Box sx={{ height: "calc(100% - 40px)" }}>
              <AssignmentList refreshKey={refreshKey} onRefresh={handleRefresh} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
