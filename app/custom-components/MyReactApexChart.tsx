import { memo } from 'react';
//import ReactApexChart, {Props}  from "react-apexcharts"
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Props } from 'react-apexcharts';
import eq from 'lodash/eq';

interface MyReactApexChartProps extends Props {}

const MyReactApexChart = ({ ...props }: MyReactApexChartProps) => {
 //console.log('MyReactApexChart  rendered');
  return <ReactApexChart {...props}> </ReactApexChart>;
};

export default memo(MyReactApexChart, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
