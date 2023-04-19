import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Snackbar,
  Stack, Table, TableBody, TableHead,
  TableContainer,
  TableCell,
  TableRow,
  Unstable_Grid2 as Grid, tableCellClasses
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 const PresView = () => {
   const[dt,setDt] = useState([]);
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



   useEffect(() => {
     const token = JSON.parse(localStorage.getItem('token'));
     try {
       axios.get(`http://20.237.103.85/api/v1/auth/record/pres/`+router.query.id,{headers:{Authorization:`Bearer ${token.token}`}}).then((res)=>{
         const data = res.data;
         setDt(data)
       }).catch(()=>{
         handleClick();
       })
     } catch (err) {
       console.error(err)
     }

   },[]);


   return (
    <div>
      <Snackbar open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}   >
        <Alert onClose={handleClose}
               severity="error" sx={{ backgroundColor: 'red', color: 'white',width: '100%'  }} >
          Error
        </Alert>
      </Snackbar>

      {dt && dt.map((row,index) => (
        <div key={index}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
          >
            <Container maxWidth="lg">
              <Stack spacing={3}>
                <div>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                    >
                      <Box sx={{ boxShadow: 20,border: "1px solid #ebebeb", }}>
                        <CardHeader
                          subheader="Patient"
                        />
                        <CardContent sx={{ pt: 0 }}>
                          <Box sx={{ m: -1.5}}>
                            <h3>Name</h3>
                            <p>{row.name}</p>
                            <h3>Disease</h3>
                            <p>{row.disease}</p>
                            <h3>Age</h3>
                            <p>{row.age}</p>
                          </Box>
                        </CardContent>
                      </Box>
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                      lg={8}
                    >
                      <TableContainer component={Paper} >
                        <Table  aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Patient</StyledTableCell>
                              <StyledTableCell align="right">Date</StyledTableCell>
                              <StyledTableCell align="right">Result</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.list && row.list.map((rd,i) => (
                              <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">{rd.medicine}</StyledTableCell>
                                <StyledTableCell align="right">{rd.usage}</StyledTableCell>
                                <StyledTableCell align="right">{rd.dose}</StyledTableCell>

                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                  </Grid>
                </div>
              </Stack>
            </Container>
          </Box>


        </div>
      ))}




    </div>
  );
};



export default PresView;

