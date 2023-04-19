import { useEffect, useState } from 'react';
import {
  Box,
  CardContent,
  CardHeader,
} from '@mui/material';




export const ViewAI = () => {
  const [drugs, setDrugs] = useState("");
  const [dis, setDis] = useState("");


  useEffect(() => {
    const pt = JSON.parse(localStorage.getItem('patient'));
    if(pt!=null)
    {
      setDis(pt.disease)
      setDrugs(pt.drugs)
    }


  },[]);


  return (
    <div>
        <Box sx={{ boxShadow: 20,border: "1px solid #ebebeb", }}>
          <CardHeader
            subheader="AI result"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5}}>
              <h3>Disease</h3>
              <p>{dis}</p>
              <h3>Medicines</h3>
              {drugs && drugs.map((rd,i) => (
                <ul key={i}>
                  <li>{rd}</li>
                </ul>
              ))}
            </Box>
          </CardContent>
        </Box>
    </div>
  );
};