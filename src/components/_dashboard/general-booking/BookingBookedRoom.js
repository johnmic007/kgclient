import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@material-ui/core';
import { fShortenNumber } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';

const LABEL = ['Coimbatore', 'Bangalore', 'Chennai', 'Thiruvananthapuram'];

const MOCK_SALES = [
  { status: 'Coimbatore', quantity: 200, value: 10 },
  { status: 'Bangalore', quantity: 180, value: 30 },
  { status: 'Chennai', quantity: 150, value: 80 },
  { status: 'Thiruvananthapuram', quantity: 140, value: 50 }
];

export default function BookingBookedRoom() {
  return (
    <Box height="100%">
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Branch wise placed students" />
        <Stack spacing={7} sx={{ px: 3, my: 5, flex: 1 }}>
          {MOCK_SALES.map((progress) => (
            <LinearProgress
              key={progress.status}
              variant="determinate"
              value={progress.value}
              color={
                (progress.status === 'Pending' && 'warning') || (progress.status === 'Cancel' && 'error') || 'success'
              }
              sx={{ height: 8, bgcolor: 'grey.50016' }}
            />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ px: 3, pb: 3 }}>
          {MOCK_SALES.map((progress) => (
            <Stack
              key={progress.status}
              alignItems="center"
              sx={{ flex: 1, marginBottom: 6 }} // Ensure even spacing
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 0.5,
                    bgcolor: 'success.main',
                    ...(progress.status === 'Coimbatore' && { bgcolor: 'warning.main' }),
                    ...(progress.status === 'Bangalore' && { bgcolor: 'error.main' })
                  }}
                />
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  {progress.status}
                </Typography>
              </Stack>
              <Typography variant="h6">{fShortenNumber(progress.quantity)}</Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}
