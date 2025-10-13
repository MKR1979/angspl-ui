import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyDownloadForOfflineTwoToneIconProps extends SvgIconProps {}
const MyDownloadForOfflineTwoToneIcon = ({ ...props }: MyDownloadForOfflineTwoToneIconProps) => {
  // console.log('MyDownloadForOfflineTwoToneIcon render');
  return <DownloadForOfflineTwoToneIcon {...props}></DownloadForOfflineTwoToneIcon>;
};
export default memo(MyDownloadForOfflineTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
