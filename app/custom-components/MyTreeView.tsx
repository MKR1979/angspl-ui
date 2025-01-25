import { memo } from 'react';
import { TreeView, TreeViewProps } from '@mui/x-tree-view/TreeView';
import eq from 'lodash/eq';

interface MyTreeViewProps extends TreeViewProps<boolean | undefined> {}

const MyTreeView = ({ ...props }: MyTreeViewProps) => {
  console.log('MyTreeView rendered');
  return <TreeView {...props} />;
};

export default memo(MyTreeView, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
