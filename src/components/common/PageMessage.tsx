import { Alert, Box } from '@mui/material';

type PageMessageProps = {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
};

export const PageMessage = ({
  message,
  severity = 'error',
}: PageMessageProps) => {
  return (
    <Box sx={{ py: 3 }}>
      <Alert severity={severity}>{message}</Alert>
    </Box>
  );
};