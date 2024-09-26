import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [page, rowsPerPage]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `/api/v1/courses/getAllCourses?page=${page + 1}&limit=${rowsPerPage}`
      );
      setCourses(response.data.data.docs);
      setTotalCourses(response.data.data.totalDocs);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.teacher.name}</TableCell>
              </TableRow>
            ))}
            {/* Fill remaining rows to maintain fixed table size */}
            {Array.from(Array(rowsPerPage - courses.length)).map((_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell colSpan={3} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCourses}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CourseList;
