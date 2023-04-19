import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider, Snackbar,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';



export const Press = () => {

  const router = useRouter();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [nic, setNic] = useState("");
  const [token, setToken] = useState("");
  const [dis,setDis] = useState("");
  const [gen,setGen] = useState("");
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

  useEffect(() => {
    const pt = JSON.parse(localStorage.getItem('patient'));
    if(pt!==null)
    {
      setFname(pt.firstname)
      setLname(pt.lastname)
      setAge(pt.age)
      setNic(pt.nic)
      setDis(pt.disease)
      setGen(pt.gender)
    }

    const tk = JSON.parse(localStorage.getItem('token'));
    if(pt!==null)
    {
      setToken(tk)
    }
  },[]);




  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      fname:fname,
      lname:lname,
      age:age,
      nic:nic,
      disease:dis
    },
    validationSchema: Yup.object({
      fname: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      lname: Yup
        .string()
        .max(100)
        .required('Last Name is required'),
      age: Yup
        .number()
        .required('Age is required'),
      nic: Yup
        .string()
        .max(20)
        .required('NIC is required'),
      disease: Yup
        .string()
        .max(20)
        .required('NIC is required'),

    }),

    onSubmit: async (values) => {


        const dt = JSON.parse(localStorage.getItem('drugs'));
        try {
          axios.post(`http://localhost:8080/api/v1/auth/record/save/pres`, {
            "firstname":values.fname,
            "lastname":values.lname,
            "nic":values.nic,
            'gender':gen,
            "age":values.age,
            "disease":values.disease,
            "list":dt
          },{headers:{Authorization:`Bearer ${token.token}`}}).then(()=>{
            localStorage.removeItem('patient')
            localStorage.removeItem('drugs')
            router.push("/patients")
          }).catch(()=>{
            handleClick();
          })
        } catch (err) {
          console.error(err)
        }
    }
  });



  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "right" }}   >
        <Alert onClose={handleClose} severity="error"  sx={{ backgroundColor: 'red', color: 'white',width: '100%' }} >
          Error
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ boxShadow: 20,border: "1px solid #ebebeb", }}>
          <CardHeader
            subheader="The information of the prescription"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5}}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="First name"
                    name="fname"
                    error={!!(formik.touched.fname && formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                    sx={{
                      input: {
                        border: "1px solid #000000",
                      },
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lname"
                    error={!!(formik.touched.lname && formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                    sx={{
                      input: {
                        border: "1px solid #000000",
                      },
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type={"number"}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    error={!!(formik.touched.age && formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    sx={{
                      input: {
                        border: "1px solid #000000",
                      },
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="NIC"
                    name="nic"
                    error={!!(formik.touched.nic && formik.errors.nic)}
                    helperText={formik.touched.nic && formik.errors.nic}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nic}
                    sx={{
                      input: {
                        border: "1px solid #000000",
                      },
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Disease"
                    name="disease"
                    error={!!(formik.touched.disease && formik.errors.disease)}
                    helperText={formik.touched.disease && formik.errors.disease}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.disease}
                    sx={{
                      input: {
                        border: "1px solid #000000",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit">
              Save prescription
            </Button>
          </CardActions>
        </Box>
      </form>
    </div>
  );
};