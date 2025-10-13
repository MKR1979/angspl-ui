import { LineChart, LineChartProps } from '@mui/x-charts/LineChart';
import eq from 'lodash/eq';
import { memo } from 'react';

interface MyLineChartProps extends LineChartProps {}

const MyLineChart = ({ ...props }: MyLineChartProps) => {
 // console.log('MyLineChart rendered');
  return <LineChart yAxis={[{ min: 0, scaleType: 'linear' }]} {...props}></LineChart>;
};

export default memo(MyLineChart, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
