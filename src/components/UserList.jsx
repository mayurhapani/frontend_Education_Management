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
import PropTypes from 'prop-types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }
    fetchUsers();
    checkAdminStatus();
  }, [page, rowsPerPage]);

  const checkAdminStatus = () => {
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `${BASE_URL}/users/getUsers?role=${role}&page=${page + 1}&limit=${rowsPerPage}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setUsers(response.data.data.docs);
        setTotalUsers(response.data.data.totalDocs);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsers([]);
        setTotalUsers(0);
      }
    } catch (error) {
      console.error(`Error fetching ${role}s:`, error.response?.data || error.message);
      setUsers([]);
      setTotalUsers(0);
    }
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality
    console.log("Delete user:", userId);
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
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {Array.from(Array(rowsPerPage - users.length)).map((_, index) => (
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
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

UserList.propTypes = {
  role: PropTypes.string.isRequired,
};

export default UserList;
