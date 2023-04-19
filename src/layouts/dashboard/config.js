import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';


export const items = [
  {
    title: 'Overview',
    path: '/view',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Prescription',
    path: '/prescription',
    icon: (
      <SvgIcon fontSize="small">
        <BookOpenIcon />
      </SvgIcon>
    )
  },
];
