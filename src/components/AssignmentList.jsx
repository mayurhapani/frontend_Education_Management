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

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalAssignments, setTotalAssignments] = useState(0);

  useEffect(() => {
    fetchAssignments();
  }, [page, rowsPerPage]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`/api/v1/assignments?page=${page + 1}&limit=${rowsPerPage}`);
      setAssignments(response.data.data.docs);
      setTotalAssignments(response.data.data.totalDocs);
    } catch (error) {
      console.error("Error fetching assignments:", error);
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
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {/* Fill remaining rows to maintain fixed table size */}
            {Array.from(Array(rowsPerPage - assignments.length)).map((_, index) => (
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
        count={totalAssignments}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AssignmentList;
