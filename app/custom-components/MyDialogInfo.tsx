import Modal, { ModalProps } from '@mui/material/Modal';
import MyButton from './MyButton';
import { memo, useRef } from 'react';
//import MyCloseIcon from './MyCloseIcon';
import MyDivider from './MyDivider';
import MyCardActions from './MyCardActions';
import MyCardContent from './MyCardContent';
import MyGrid from './MyGrid';
import eq from 'lodash/eq';
//mport MyIconButton from './MyIconButton';
import MyCard from './MyCard';

interface MyDialogInfoProps {
  title: string;
  onOKClick(e: React.MouseEvent): void;
}

const MyDialogInfo = ({ children, ...props }: ModalProps & MyDialogInfoProps) => {
  const rootRef = useRef(null);
  // console.log('MyDialogInfo rendered');
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      container={() => rootRef.current}
      {...props}
    >
      <MyCard
        sx={{
          width: 450,
          zIndex: 1
        }}
        title={props.title}
        // content={false}
        // secondary={
        //   <MyIconButton size="large">
        //     <MyCloseIcon fontSize="small" onClick={props.onOKClick} />
        //   </MyIconButton>
        // }
      >
        <MyCardContent>{children}</MyCardContent>
        <MyDivider />
        <MyCardActions>
          <MyGrid container display="flex" justifyContent="flex-end">
            <MyButton onClick={props.onOKClick}>OK</MyButton>
          </MyGrid>
        </MyCardActions>
      </MyCard>
    </Modal>
  );
};

export default memo(MyDialogInfo, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
