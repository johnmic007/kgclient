import React, { useContext } from 'react';
import { Container, Grid, Card, Stack, TextField, Typography, Button, MenuItem } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Page from '../../components/Page';
import { AuthContext } from '../../contexts/JWTContext';

const AddReferals = () => {
  const { user } = useContext(AuthContext);

  const initialValues = {
    friendName: '',
    courseSuggestion: '',
    phoneNumber: '',
    email: '',
    byWhom: user._id
  };

  const validationSchema = Yup.object().shape({
    friendName: Yup.string().required("Friend's name is required"),
    courseSuggestion: Yup.string().required('Course suggestion is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/user/createReferral', values);
      console.log(response.data);
      alert('Form submitted successfully!');
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      alert('Error submitting form. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Page title="Referral Form">
      <Container maxWidth="md">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, isSubmitting }) => (
            <Form noValidate autoComplete="off">
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h3" gutterBottom>
                      Referral Form
                    </Typography>
                    <Stack spacing={3}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Friend's Name"
                        name="friendName"
                        error={touched.friendName && !!errors.friendName}
                        helperText={touched.friendName && errors.friendName}
                      />
                      <Field
                        as={TextField}
                        select
                        fullWidth
                        label="Course Suggestion"
                        name="courseSuggestion"
                        error={touched.courseSuggestion && !!errors.courseSuggestion}
                        helperText={touched.courseSuggestion && errors.courseSuggestion}
                      >
                        <MenuItem value="MERN">MERN</MenuItem>
                        <MenuItem value="Web Development">Web Development</MenuItem>
                        <MenuItem value="SAP">SAP</MenuItem>
                        <MenuItem value="IMS">IMS</MenuItem>
                      </Field>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        error={touched.phoneNumber && !!errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        label="Email"
                        name="email"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                      <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

export default AddReferals;
