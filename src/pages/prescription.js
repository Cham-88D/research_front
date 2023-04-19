import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Press } from '../sections/prescription/prescription';
import { ViewAI } from '../sections/prescription/viewAI';
import { AddDrug } from '../sections/prescription/addForm';

//prescription details page
const Page = () => (
  <>
    <Head>
      <title>
        Prescription
      </title>
    </Head>
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
            <Typography variant="h4">
              Prescription
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
              <Press/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AddDrug/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <ViewAI/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;