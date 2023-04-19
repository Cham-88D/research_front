import { useEffect, useState,useMemo  } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  CardContent,
  CardHeader,
 MenuItem
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

export const ViewPt = () => {
  const [user, setUser] = useState([]);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      axios.get(`http://localhost:8080/api/v1/auth/patient/USER`,{headers:{Authorization:`Bearer ${token.token}`}}).then((res)=>{
        const users = res.data;
        setUser(users);
      }).catch(()=>{
        setIsError(true);
      })
    } catch (err) {
      console.error(err)
    }
    setIsError(false);

  },[]);


  const columns = useMemo(

    () => [
      {
        accessorKey: 'firstname',
        header: 'First Name',
      },
      {
        accessorKey: 'lastname',
        header: 'Last Name',
      },
      {
        accessorKey: 'nic',
        header: 'NIC',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      }

    ],
    [],
  );



  return (
    <div>
      <Box sx={{ boxShadow: 20,border: "1px solid #ebebeb", }}>
        <CardHeader
          subheader="Patients table"
        />
        <CardContent sx={{ pt: 0 }}>
          <MaterialReactTable enableRowActions columns={columns}  renderRowActionMenuItems={({ row }) => [
            <MenuItem
              key={0}
              onClick={() => {

              }}
              sx={{ m: 0 }}
            >

              <Link
                style={{textDecoration: 'none'}}
                href={{ pathname: "/presview", query: { id: row.original.nic } }}
              >
                View Prescriptions
              </Link>

            </MenuItem>
          ]}  data={user} muiToolbarAlertBannerProps={isError ? { color: 'error', children: 'Error loading data', } : undefined}/>
        </CardContent>
      </Box>
    </div>
  );
};