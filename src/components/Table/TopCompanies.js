import React from 'react';
import { Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const TopCompanies = () => {
  const top10Companies = [
    {
      id: 1,
      company_name: 'company_1',
      total_no_of_openings: 200,
      placed_students_count: 120
    },
    {
      id: 2,
      company_name: 'company_2',
      total_no_of_openings: 180,
      placed_students_count: 110
    },
    {
      id: 3,
      company_name: 'company_3',
      total_no_of_openings: 150,
      placed_students_count: 90
    },
    {
      id: 4,
      company_name: 'company_4',
      total_no_of_openings: 140,
      placed_students_count: 80
    },
    {
      id: 5,
      company_name: 'company_5',
      total_no_of_openings: 130,
      placed_students_count: 70
    }
  ];
  return (
    <Card>
      <CardContent>
        <h2 style={{ margin: 10 }}>Top Companies</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Total Openings</TableCell>
              <TableCell>Placed Students Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10Companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.company_name}</TableCell>
                <TableCell>{company.total_no_of_openings}</TableCell>
                <TableCell>{company.placed_students_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopCompanies;
