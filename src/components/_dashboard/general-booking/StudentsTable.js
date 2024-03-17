import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';

const StudentTable = () => {
  const students = [
    {
      student_id: 1,
      student_name: 'example',
      student_email: 'example@gmail.com',
      mode: 'online',
      branch: 'Coimbatore',
      domain: 'software programming',
      company_name: 'example company'
    },
    {
      student_id: 2,
      student_name: 'example',
      student_email: 'example@gmail.com',
      mode: 'offline',
      branch: 'Coimbatore',
      domain: 'software programming',
      company_name: 'example company'
    },
    {
      student_id: 3,
      student_name: 'example',
      student_email: 'example@gmail.com',
      mode: 'offline',
      branch: 'Coimbatore',
      domain: 'software programming',
      company_name: 'example company'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Recently Placed Students
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Student Email</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>Company Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.student_name}</TableCell>
                  <TableCell>{student.student_email}</TableCell>
                  <TableCell>{student.mode}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.domain}</TableCell>
                  <TableCell>{student.company_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default StudentTable;
