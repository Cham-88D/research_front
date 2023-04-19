import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';


//login
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
      password: ''
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
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        axios.post(`http://20.237.103.85/api/v1/auth/login`, {
          "email":values.email,"password":values.password
        }).then((res)=>{
          localStorage.setItem('token', JSON.stringify(res.data));
          router.push('/view');
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
      <Snackbar open={open}
         autoHideDuration={6000}
         onClose={handleClose}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}   >
        <Alert onClose={handleClose}
         severity="error" sx={{ backgroundColor: 'red', color: 'white',width: '100%'  }} >
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
                justifyContent: 'center'
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
                      Login
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Don&apos;t have an account?
                      &nbsp;
                      <Link
                        component={NextLink}
                        href="/register"
                        underline="hover"
                        variant="subtitle2"
                      >
                        Register
                      </Link>
                    </Typography>
                  </Stack>

                  <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <Stack spacing={3}>
                      <TextField
                        label="Email Address"
                        name="email"
                        fullWidth
                        type="email"
                        error={!!(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
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
                      Login
                    </Button>
                  </form>
                </div>
              </Box>
            </Box>
    </>
  );
};

export default Page;
