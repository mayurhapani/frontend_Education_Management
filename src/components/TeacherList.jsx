import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import axios from 'axios';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTeachers, setTotalTeachers] = useState(0);

  useEffect(() => {
    fetchTeachers();
  }, [page, rowsPerPage]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`/api/v1/users/getUsers?role=teacher&page=${page + 1}&limit=${rowsPerPage}`);
      setTeachers(response.data.data.docs);
      setTotalTeachers(response.data.data.totalDocs);
    } catch (error) {
      console.error('Error fetching teachers:', error);
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
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.role}</TableCell>
              </TableRow>
            ))}
            {/* Fill remaining rows to maintain fixed table size */}
            {Array.from(Array(rowsPerPage - teachers.length)).map((_, index) => (
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
        count={totalTeachers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TeacherList;
