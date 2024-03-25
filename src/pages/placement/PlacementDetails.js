import React, { useState } from 'react';
import { Container, Grid, Card, Stack, TextField, Typography, MenuItem } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton, DatePicker } from '@material-ui/lab';
import Page from '../../components/Page';

const PlacementDetails = () => {
  const [data, setData] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      email: '',
      mobile: '',
      dropdownValue: '',
      selectedDate: null
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Your form submission logic here
        console.log('Form submitted:', values);
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Page title="Blog: New Post | KGISL">
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Placement Details
          </Typography>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Name of the Students"
                        {...getFieldProps('title')}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                      />
                      <TextField
                        fullWidth
                        select
                        label="Select the company"
                        {...getFieldProps('dropdownValue')}
                        error={Boolean(touched.dropdownValue && errors.dropdownValue)}
                        helperText={touched.dropdownValue && errors.dropdownValue}
                      />
                      <TextField
                        fullWidth
                        select
                        label="Select the Drive"
                        {...getFieldProps('dropdownValue')}
                        error={Boolean(touched.dropdownValue && errors.dropdownValue)}
                        helperText={touched.dropdownValue && errors.dropdownValue}
                      />
                      <TextField
                        fullWidth
                        select
                        label="Select the Branch"
                        {...getFieldProps('dropdownValue')}
                        error={Boolean(touched.dropdownValue && errors.dropdownValue)}
                        helperText={touched.dropdownValue && errors.dropdownValue}
                      />
                      <TextField
                        fullWidth
                        select
                        label="Select the Batch"
                        {...getFieldProps('dropdownValue')}
                        error={Boolean(touched.dropdownValue && errors.dropdownValue)}
                        helperText={touched.dropdownValue && errors.dropdownValue}
                      />

                      <TextField
                        fullWidth
                        label="Email Address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        fullWidth
                        select
                        label="Mode of the interview"
                        {...getFieldProps('dropdownValue')}
                        error={Boolean(touched.dropdownValue && errors.dropdownValue)}
                        helperText={touched.dropdownValue && errors.dropdownValue}
                      >
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                        <MenuItem value="option3">Option 3</MenuItem>
                      </TextField>

                      <DatePicker
                        fullWidth
                        label="Select Date"
                        {...getFieldProps('selectedDate')}
                        error={Boolean(touched.selectedDate && errors.selectedDate)}
                        helperText={touched.selectedDate && errors.selectedDate}
                        renderInput={(params) => <TextField {...params} />}
                      />

                      <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                        Submit
                      </LoadingButton>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Container>
      </Page>
    </>
  );
};

export default PlacementDetails;
