import { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';
import eq from 'lodash/eq';
interface MyDangerProps extends ButtonProps {}
const MyDangerButton = ({ ...props }: MyDangerProps) => {
  const theme = useTheme();
  // console.log('MyDangerButton rendered');
  return (
    <Button
      variant="contained"
      sx={{ background: theme.palette.error.main, '&:hover': { background: theme.palette.error.dark } }}
      {...props}
    />
  );
};

export default memo(MyDangerButton, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
