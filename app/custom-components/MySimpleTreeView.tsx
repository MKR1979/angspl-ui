import { memo } from 'react';
import { SimpleTreeView, SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import eq from 'lodash/eq';

interface MySimpleTreeViewProps extends SimpleTreeViewProps<boolean | undefined> {}

const MySimpleTreeView = ({ ...props }: MySimpleTreeViewProps) => {
//  console.log('MySimpleTreeView rendered');
  return <SimpleTreeView {...props} />;
};

export default memo(MySimpleTreeView, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
