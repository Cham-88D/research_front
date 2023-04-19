import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Details } from '../sections/overview/form';

//patient details page

const Page = () => (
  <>
    <Head>
      <title>
        Overview
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
              Patient Details
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >

              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={10}
              >
                <Details/>
              </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

export default Page;
