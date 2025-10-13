import { memo } from 'react';
import { TreeItem, TreeItemProps } from '@mui/x-tree-view/TreeItem';
import eq from 'lodash/eq';

interface MyTreeItemProps extends TreeItemProps {}

const MyTreeItem = ({ ...props }: MyTreeItemProps) => {
  //console.log('MyTreeItem  rendered');
  return <TreeItem {...props} />;
};

export default memo(MyTreeItem, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
