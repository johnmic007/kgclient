import { useSelector } from 'react-redux';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { BookingIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------

export default function StudentsEnrolled() {
  const studentsEnrolled = useSelector((state) => state.placement.studentsEnrolled);
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(studentsEnrolled)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Total Students Enrolled
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%'
        }}
      />
    </RootStyle>
  );
}
