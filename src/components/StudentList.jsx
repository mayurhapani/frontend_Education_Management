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

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, [page, rowsPerPage]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `/api/v1/users/getUsers?role=student&page=${page + 1}&limit=${rowsPerPage}`
      );
      setStudents(response.data.data.docs);
      setTotalStudents(response.data.data.totalDocs);
    } catch (error) {
      console.error("Error fetching students:", error);
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.role}</TableCell>
              </TableRow>
            ))}
            {/* Fill remaining rows to maintain fixed table size */}
            {Array.from(Array(rowsPerPage - students.length)).map((_, index) => (
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
        count={totalStudents}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StudentList;
