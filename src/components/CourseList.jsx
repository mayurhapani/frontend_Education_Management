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
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import PropTypes from "prop-types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CourseList = ({ initialCourses = [] }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCourses, setTotalCourses] = useState(initialCourses.length);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (initialCourses.length > 0) {
      setCourses(initialCourses);
      setTotalCourses(initialCourses.length);
    } else {
      fetchCourses();
    }
    checkAdminStatus();
  }, [initialCourses, page, rowsPerPage]);

  const checkAdminStatus = () => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `${BASE_URL}/courses/getAllCourses?page=${page + 1}&limit=${rowsPerPage}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setCourses(response.data.data.docs || []);
        setTotalCourses(response.data.data.totalDocs || 0);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setCourses([]);
        setTotalCourses(0);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response?.data || error.message);
      setCourses([]);
      setTotalCourses(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (courseId) => {
    // Implement edit functionality
    console.log("Edit course:", courseId);
  };

  const handleDelete = (courseId) => {
    // Implement delete functionality
    console.log("Delete course:", courseId);
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
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.teacher?.name || 'N/A'}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <IconButton onClick={() => handleEdit(course._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(course._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
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

CourseList.propTypes = {
  initialCourses: PropTypes.array
};

export default CourseList;
