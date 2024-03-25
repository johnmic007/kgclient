import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import Axios
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment, Alert, MenuItem } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { MIconButton } from '../../@material-extend';
import { BASE_URL } from '../../../utils/axios';

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    city: Yup.string().required('City is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    batch: Yup.string().when('courseEnrolled', {
      is: 'true',
      then: Yup.string().required('Batch is required')
    }),
    courseEnrolled: Yup.boolean().required('Course enrollment status is required'),
    // course: Yup.string().required('Course is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      city: '',
      password: '',
      batch: '',
      courseEnrolled: 'false',
      course: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log(values);
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
          name: values.name,
          city: values.city,
          email: values.email,
          batch: values.batch,
          courseEnrolled: values.courseEnrolled === 'true',
          role: 'user', // Setting role as 'user' since it's removed from the form
          password: values.password,
          course: values.course
        });
        window.location.href = '/auth/login';
        enqueueSnackbar('Register success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
        console.log(response.data); // Log response data
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            label="City"
            {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />

          <TextField
            select
            fullWidth
            label="Course Enrolled"
            {...getFieldProps('courseEnrolled')}
            error={Boolean(touched.courseEnrolled && errors.courseEnrolled)}
            helperText={touched.courseEnrolled && errors.courseEnrolled}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>

          {formik.values.courseEnrolled === 'true' && (
            <>
              <TextField
                select
                fullWidth
                label="Course"
                {...getFieldProps('course')}
                error={Boolean(touched.course && errors.course)}
                helperText={touched.course && errors.course}
              >
                <MenuItem value="MERN">MERN</MenuItem>
                <MenuItem value="IMS">IMS</MenuItem>
                <MenuItem value="DM">DM</MenuItem>
                <MenuItem value="SAP">SAP</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Batch"
                {...getFieldProps('batch')}
                error={Boolean(touched.batch && errors.batch)}
                helperText={touched.batch && errors.batch}
              />
            </>
          )}

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
