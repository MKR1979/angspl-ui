'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewLead from './useViewScheduleFee';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import {
  Card,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentReceipt from '../../../../../custom-components/payment-receipt/MyPaymentReceipt';
import DoneIcon from '@mui/icons-material/Done';

type Props = {
  dtoScheduleFee: ScheduleFeeDTO;
};

const ClientViewScheduleFee = ({ dtoScheduleFee }: Props) => {
  const {
    state,
    generateReceipt,
    onCancelClick,
    handleTabChange,
    // onEditClick,
    setGenerateReceipt,
    formatDate,
    handlePayNow,
    calculatePayableAmount
  } = useViewLead({ dtoScheduleFee });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Student Fee Information" />
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Fee Breakup" />
          </MyTabs>

          <MyTabPanel value={state.tabIndex} index={0}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Course Name:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.course_name}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Student Name:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.student_name}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Payment Frequency:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.payment_frequency}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Start Date :</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.start_date}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Discount:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.discount}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Fine Amount:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.fine_amount}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Total Amount :</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.total_amount}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Net Amount :</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.net_amount}</MyTypography>
                </MyBox>
              </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Status:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoScheduleFee.status}</MyTypography>
                </MyBox>
              </MyGrid>
            </MyGrid>
          </MyTabPanel>

          <MyTabPanel value={state.tabIndex} index={1}>
            {generateReceipt ? (
              <PaymentReceipt
                course_name={state.dtoReceipt.course_name}
                learner_id={state.dtoReceipt.learner_id ?? 0}
                student_name={state.dtoReceipt.student_name}
                receipt_number={state.dtoReceipt.receipt_number}
                payment_date={state.dtoReceipt.payment_date}
                payment_mode={state.dtoReceipt.payment_mode}
                cheque_number={state.dtoReceipt.cheque_number}
                fee_head={state.dtoReceipt.fee_head}
                fee_amount={state.dtoReceipt.fee_amount}
                remarks={state.dtoReceipt.remarks}
                status={state.dtoReceipt.status}
                onCancel={() => setGenerateReceipt(false)}
              />
            ) : (
              <Card variant="outlined" sx={{ p: 4, borderRadius: 3, backgroundColor: '#fafafa', boxShadow: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black', mt: -1 }}>
                  Fees Dues Information
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>S. No.</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Student Id</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Student Name</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Course Name</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Month</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Year</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Due Date</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Total Amount</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.arrScheduleFeeDTO && state.arrScheduleFeeDTO.length > 0 ? (
                        state.arrScheduleFeeDTO.map((due, index) => (
                          <TableRow key={due.id ?? index} sx={{ height: 36, '& td': { py: 0.5, color: 'grey.800' } }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>{index + 1}</TableCell>
                            <TableCell>{due.learner_id}</TableCell>
                            <TableCell>{due.student_name}</TableCell>
                            <TableCell>{due.course_name}</TableCell>
                            <TableCell>{due.fee_cycle_code}</TableCell>
                            <TableCell>{due.fee_year}</TableCell>
                            <TableCell>{formatDate(due.due_date)}</TableCell>
                            <TableCell>{due.fee_amount}</TableCell>
                            <TableCell>
                              {due.is_paid ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <DoneIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                                  <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'primary.main' }}>Paid</Typography>
                                </Box>
                              ) : (
                                <Button
                                  color="primary"
                                  variant="text"
                                  onClick={() =>
                                    handlePayNow(
                                      due.course_name,
                                      calculatePayableAmount(due.fee_amount, due.fine_amount, due.discount),
                                      due
                                    )
                                  }
                                  startIcon={<PaymentIcon />}
                                  sx={{
                                    minWidth: 'auto',
                                    fontSize: 12,
                                    textTransform: 'none',
                                    '&:hover': {
                                      color: 'primary.main',
                                      textDecoration: 'underline',
                                      backgroundColor: 'transparent',
                                      transform: 'scale(1.05)'
                                    }
                                  }}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 2, fontStyle: 'italic', color: 'gray' }}>
                            No dues found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </MyTabPanel>
        </MyCardContent>

        <>
          <MyDivider />
          {state.tabIndex === 0 && (
            <MyTimestamp
              createdBy={state.dtoScheduleFee.created_by_user_name}
              createdAt={state.dtoScheduleFee.created_at}
              modifiedBy={state.dtoScheduleFee.modified_by_user_name}
              modifiedAt={state.dtoScheduleFee.modified_at}
            />
          )}
          <MyCardActions>
            {' '}
            {/* {state.tabIndex === 0 && <MyButton onClick={onEditClick}>Edit</MyButton>} */}
            <MyButton onClick={onCancelClick}>Cancel</MyButton>
          </MyCardActions>
        </>
      </MyCard>
    </>
  );
};

export default memo(ClientViewScheduleFee, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
