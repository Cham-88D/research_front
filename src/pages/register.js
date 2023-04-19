import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Link, Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';


//Register admin
const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fname: '',
      lname: '',
      nic:'',
      role:'ADMIN'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      fname: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      lname: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      nic: Yup
        .string()
        .max(20)
        .required('NIC is required')
    }),
    onSubmit: async (values) => {
      try {
        axios.post(`http://localhost:8080/api/v1/auth/register`, {
          "firstname":values.fname,
          "lastname":values.lname,
          "email":values.email,
          "password":values.password,
          "nic":values.nic,
          "role":values.role
        }).then(()=>{
          router.push('/');
        }).catch(()=>{
          handleClick();
        })

      } catch (err) {
        console.error(err)
      }
    }
  });



  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "right" }}   >
        <Alert onClose={handleClose} severity="error"  sx={{ backgroundColor: 'red', color: 'white',width: '100%' }} >
          Login Failed
        </Alert>
      </Snackbar>
      <Head>
        <title>
          Login
        </title>
      </Head>

      <Box
        sx={{
          marginTop:'90px',
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}

        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/"
                  underline="hover"
                  variant="subtitle2"
                >
                  Login
                </Link>
              </Typography>
            </Stack>

            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  fullWidth
                  label="First name"
                  name="fname"
                  error={!!(formik.touched.fname && formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fname}
                />
                <TextField
                  fullWidth
                  label="Last name"
                  name="lname"
                  error={!!(formik.touched.lname && formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lname}
                />
                <TextField
                  fullWidth
                  label="NIC"
                  name="nic"
                  error={!!(formik.touched.nic && formik.errors.nic)}
                  helperText={formik.touched.nic && formik.errors.nic}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nic}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
