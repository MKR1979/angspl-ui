import { memo } from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { SparkLineChartProps } from '@mui/x-charts/SparkLineChart/SparkLineChart';
import eq from 'lodash/eq';

interface MySparkLineProps extends SparkLineChartProps {}

const MySparkLineChart = ({ ...props }: MySparkLineProps) => {
  console.log('MySparkLineChart rendered');
  return <SparkLineChart {...props}></SparkLineChart>;
};

export default memo(MySparkLineChart, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
