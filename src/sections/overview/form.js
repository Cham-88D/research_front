import {useState } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider, InputLabel, MenuItem, OutlinedInput, Select, Chip,
  TextField,
  Unstable_Grid2 as Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Alert, Snackbar
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const names = [
   'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
    'chills', 'joint_pain', 'stomach_pain','acidity', 'ulcers_on_tongue', 'muscle_wasting',
    'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain',
    'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness',
    'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever',
    'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache',
    'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
    'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
    'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
    'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
    'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
    'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
    'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus',
    'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
    'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
    'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts',
    'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
    'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness',
    'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
    'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine',
    'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression',
    'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
    'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes',
    'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum',
    'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
    'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
    'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf',
    'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring',
    'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails',
    'blister', 'red_sore_around_nose', 'yellow_crust_ooze', 'light_headedness',
    'irregular_heart_sound', 'decrease_alertness', 'chest_discomfort', 'irregular_heart_beat',
    'heart_murmur', 'arm_pain', 'stroke', 'fainting', 'shortness_of_breath'
];

export const Details = () => {

  const [gender, setGen] = useState('');
  const [symptom, setSymp] = useState([]);
  const [open, setOpen] = useState(false);
    const router = useRouter();
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
      fname: '',
      lname: '',
      age:0,
      nic:''
    },
    validationSchema: Yup.object({
      fname: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      lname: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      age: Yup
        .number()
        .required('Age is required'),
      nic: Yup
        .string()
        .max(20)
        .required('NIC is required'),

    }),

    onSubmit: async (values) => {

      try {
        axios.post(`http://20.237.103.85:5000/predict`, {
          'Gender':gender,
          'Age':values.age,
          'Symptoms':symptom
        }).then((res)=>{

          let r  ={
            "firstname":values.fname,
            "lastname":values.lname,
            "age":values.age,
            "nic":values.nic,
            "gender":gender,
            "disease":res.data.disease,
            "drugs":res.data.drugs
          }

           localStorage.setItem('patient', JSON.stringify(r));
           router.push('/prescription');

        }).catch(()=>{
          handleClick();
        })

      } catch (err) {
        console.error(err)
      }
    }
  });


  const handleChanges = (event) => {
    const { target: { value }, } = event;setSymp(typeof value === 'string' ? value.split(',') : value,);
  };

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
          subheader="The information of the patient"
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
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="Gender"
                  name="gender"
                  value={gender}
                  onChange={(event) => {
                    setGen(event.target.value);
                  }}
                >
                  <FormControlLabel value="F" control={<Radio />} label="Female" />
                  <FormControlLabel value="M" control={<Radio />} label="Male" />
                </RadioGroup>
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
                <InputLabel id="symp">Symptoms</InputLabel>
                <Select
                  labelId="sympt"
                  id="sympt"
                  multiple
                  value={symptom}
                  onChange={handleChanges}
                  input={<OutlinedInput id="sympC" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Box>
    </form>
    </div>

  );
};