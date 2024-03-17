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
  Checkbox // Import Checkbox component
} from '@material-ui/core';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [sortAscending, setSortAscending] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/user/getallusers', {
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
    fetchData();
  }, [sortAscending, page]);

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
                <TableCell>Course Enrolled</TableCell> {/* Add Course Enrolled column */}
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
                    {/* Render a checkbox, and check it if user is enrolled */}
                    <Checkbox checked={user.courseEnrolled} disabled />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleViewMore(user._id)}>
                      View more
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
              <Button onClick={() => setPage(handleNextPage)} disabled={page === totalPages - 1}>
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
