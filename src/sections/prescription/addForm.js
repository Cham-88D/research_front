import {useState } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';



export const AddDrug = () => {
  let d =[]
  const [duration, setDue] = useState('');
  const formik = useFormik({
    initialValues: {
      name: '',
      amount:0,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(100)
        .required('Name is required'),
      amount: Yup
        .number()
        .required('Amount is required')
    }),

    onSubmit: async (values) => {
      try {
        let prev = JSON.parse(localStorage.getItem('drugs'));
        if(prev !==null)
        {

          d.push.apply(d,prev)
        }
        let dData = {
          "medicine":values.name,
         "usage":duration,
         "dose":values.amount
        }
        d.push(dData)
        console.log(d)
        localStorage.setItem('drugs', JSON.stringify(d));
      } catch (err) {
           console.error("Error")
      }
    }
  });



  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ boxShadow: 20,border: "1px solid #ebebeb", }}>
          <CardHeader
            subheader="Medicine for prescription"
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
                    label="Medicine name"
                    name="name"
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                    label="Amount"
                    name="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    error={!!(formik.touched.amount && formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.amount}
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
                  <FormLabel id="duration">Duration</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="Duration"
                    name="duration"
                    value={duration}
                    onChange={(event) => {
                      setDue(event.target.value);
                    }}
                  >
                    <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                    <FormControlLabel value="Afternoon" control={<Radio />} label="Afternoon" />
                    <FormControlLabel value="Night" control={<Radio />} label="Night" />
                    <FormControlLabel value="6h" control={<Radio />} label="6h" />
                    <FormControlLabel value="3h" control={<Radio />} label="3h" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </CardActions>
        </Box>
      </form>
    </div>
  );
};