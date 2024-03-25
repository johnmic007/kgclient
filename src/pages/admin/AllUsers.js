import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  TablePagination,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import axios from 'axios';
import { BASE_URL } from '../../utils/axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [sortAscending, setSortAscending] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [sortAscending, page]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/getallusers`, {
        page: page + 1,
        perPage: 10,
        sortAscending
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages - 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewMore = (userId) => {
    window.location.href = `/dashboard/allusers/user/${userId}`;
  };

  const handleSort = () => {
    setSortAscending((prevSort) => {
      if (prevSort === null) {
        return true;
      }
      return !prevSort;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleStatusChange = async (userId, value) => {
    try {
      await axios.post(`${BASE_URL}/user/editstatus`, { courseEnrolled: value, userId });
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, courseEnrolled: value === 'Yes' } : user
      );
      setUsers(updatedUsers);
      console.log('Course enrollment status updated successfully');
      fetchData(); // Reload data after updating status
    } catch (error) {
      console.error('Error updating course enrollment status:', error);
    }
  };

  return (
    <Card>
      <Typography variant="h3" component="h2">
        All Users
      </Typography>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>No Of Referrals</TableCell>
                <TableCell>Course Enrolled</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.numberOfReferrals}</TableCell>
                  <TableCell>
                    <Select
                      value={user.courseEnrolled ? 'Yes' : 'No'}
                      onChange={(event) => handleStatusChange(user._id, event.target.value)}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleViewMore(user._id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          colSpan={5}
          count={totalPages * 5}
          rowsPerPage={5}
          page={page}
          onChangePage={handleChangePage}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          labelRowsPerPage=""
          ActionsComponent={(props) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={handlePrevPage} disabled={page === 0}>
                Prev
              </Button>
              {Array.from(Array(totalPages).keys()).map((pageNum) => (
                <Button key={pageNum} onClick={() => setPage(pageNum)} disabled={pageNum === page}>
                  {pageNum + 1}
                </Button>
              ))}
              <Button onClick={handleNextPage} disabled={page === totalPages - 1}>
                Next
              </Button>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AllUsers;
