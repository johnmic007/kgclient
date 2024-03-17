import * as Yup from 'yup';
import { Card, Grid, Stack, TextField, FormHelperText, Typography, styled, Container } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import React, { useState } from 'react';
import { LoadingButton } from '@material-ui/lab';
import { QuillEditor } from '../../components/editor';
import fakeRequest from '../../utils/fakeRequest';
import Page from '../../components/Page';

const NewBlogSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email address').required('Email is required')
});

const Company = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleClosePreview = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      email: '',
      mobile: ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
  }));

  const { errors, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <Page title="Blog: New Post | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Add Company
        </Typography>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Name of the company"
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />

                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={5}
                      label="Address"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
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
                      label="Mobile Number"
                      {...getFieldProps('mobile')}
                      error={Boolean(touched.mobile && errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />

                    <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Create
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};

export default Company;
