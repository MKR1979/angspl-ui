import GitHubIcon from '@mui/icons-material/Twitter';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyGitHubIconProps extends SvgIconProps {}
const MyGitHubIconIcon = ({ ...props }: MyGitHubIconProps) => {
  console.log('MyGitHubIcon render');
  return <GitHubIcon {...props}></GitHubIcon>;
};
export default memo(MyGitHubIconIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
