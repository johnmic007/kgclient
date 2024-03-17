// material
import PropTypes from 'prop-types';
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@material-ui/core';
// utils
import { fPercent, fCurrency } from '../../../utils/formatNumber';
import mockData from '../../../utils/mock-data';

// ----------------------------------------------------------------------

const LABELS = ['Coimbatore', 'Chennai', 'Bangalore', 'Thiruvananthapuram'];
const values = [300, 400, 500, 200];
const totalCount = [500, 600, 700, 800];

const MOCK_SALES = LABELS.map((label, index) => ({
  label,
  amount: values[index] * 100,
  value: mockData.number.percent(index)
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    amount: PropTypes.number,
    value: PropTypes.number
  })
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{progress.amount}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Chennai' && 'info') ||
          (progress.label === 'Bangalore' && 'warning') ||
          (progress.label === 'Thiruvananthapuram' && 'success') ||
          'primary'
        }
      />
    </Stack>
  );
}

export default function EcommerceSalesOverview() {
  return (
    <Card>
      <CardHeader title="Branch wise placed students" />
      <Stack spacing={4} sx={{ p: 3 }}>
        {MOCK_SALES.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
      <div style={{ display: 'flex', margin: 8, gap: 6 }}>
        {LABELS.map((label, index) => (
          <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
            {label}:{values[index]}
          </Typography>
        ))}
      </div>
    </Card>
  );
}
