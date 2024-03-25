import React, { useContext, useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  TablePagination,
  TableFooter,
  Button
} from '@material-ui/core';
import axios from 'axios'; // Import Axios
import { AuthContext } from '../../contexts/JWTContext';
import { BASE_URL } from '../../utils/axios';

const MyReferals = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [referrals, setReferrals] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/getmyreferal`,
          { userId: user._id, page: page + 1, limit: 5 } // Include page and limit in the request body
        );
        console.log(response.data.referrals);
        if (Array.isArray(response.data.referrals)) {
          setReferrals(response.data.referrals);
          setTotalPages(Math.ceil(response.data.totalReferrals / 5));
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user._id, page]); // Include user._id and page in the dependency array

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#4CAF50'; // Green
      case 'failure':
        return '#F44336'; // Red
      default:
        return '#FFC107'; // Yellow
    }
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
      <CardContent>
        <Typography variant="h3" component="h2" gutterBottom>
          My Referrals
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Course Suggested</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {referrals.map((referral, index) => (
                <TableRow key={index}>
                  <TableCell>{referral.friendName}</TableCell>
                  <TableCell>{referral.courseSuggestion}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'inline-block',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(referral.status),
                        marginRight: 8
                      }}
                    />
                    {referral.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={3}
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
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MyReferals;
