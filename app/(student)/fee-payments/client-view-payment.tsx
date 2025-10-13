'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import useViewLead from './useViewPayment';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyDescriptionTwoToneIcon from '@/app/custom-components/MyDescriptionTwoToneIcon';
import { Card, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PrintIcon from '@mui/icons-material/Print';
import PaymentReceipt from '../../custom-components/payment-receipt/MyPaymentReceipt';

const ClientViewFeeStructure = () => {
  const {
    state,
    generateReceipt,
    setGenerateReceipt,
    handleTabChange,
    formatDate,
    handlePayNow,
    calculatePayableAmount,
    selectedReceipt,
    setSelectedReceipt
  } = useViewLead();
  const handlePrint = (row: any) => {
    setSelectedReceipt(row);
  };

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyTabs value={state.tabIndex} onChange={handleTabChange}>
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Paid Fee Information" />
            <MyTab icon={<MyDescriptionTwoToneIcon />} label="Due Payment" />
          </MyTabs>
          <MyTabPanel value={state.tabIndex} index={0}>
            {selectedReceipt ? (
              <PaymentReceipt
                course_name={selectedReceipt.course_name}
                learner_id={selectedReceipt.learner_id ?? 0}
                student_name={selectedReceipt.student_name}
                receipt_number={selectedReceipt.receipt_number}
                payment_date={selectedReceipt.payment_date}
                payment_mode={selectedReceipt.payment_mode}
                cheque_number={selectedReceipt.cheque_number}
                fee_head={selectedReceipt.payment_frequency}
                fee_amount={selectedReceipt.fee_amount}
                remarks={selectedReceipt.remarks}
                status={selectedReceipt.status}
                onCancel={() => setSelectedReceipt(null)}
              />
            ) : (
              <Card variant="outlined" sx={{ p: 4, borderRadius: 3, backgroundColor: '#fafafa', boxShadow: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black', mt: -1 }}>
                  Paid Fees Information
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>S. No.</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Receipt No.</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Student Id</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Student Name</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Course Name</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Fee Type</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Month</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Year</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Payment Date</TableCell>
                        {/* <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Discount</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Fine Amount</TableCell> */}
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Total Amount</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.arrPaidPaymentDTO && state.arrPaidPaymentDTO.length > 0 ? (
                        state.arrPaidPaymentDTO.map((due, index) => (
                          <TableRow key={due.id ?? index} sx={{ height: 36, '& td': { py: 0.5, color: 'grey.800' } }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>{index + 1}</TableCell>
                            <TableCell>{due.receipt_number}</TableCell>
                            <TableCell>{due.learner_id}</TableCell>
                            <TableCell>{due.student_name}</TableCell>
                            <TableCell>{due.course_name}</TableCell>
                            <TableCell>{due.payment_frequency}</TableCell>
                            <TableCell>{due.fee_cycle_code}</TableCell>
                            <TableCell>{due.fee_year}</TableCell>
                            <TableCell>{formatDate(due.payment_date)}</TableCell>
                            {/* <TableCell>{due.discount}</TableCell>
                          <TableCell>{due.fine_amount}</TableCell> */}
                            <TableCell>{due.fee_amount}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                variant="text"
                                onClick={() => handlePrint(due)}
                                startIcon={<PrintIcon />}
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
                                Print
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 2, fontStyle: 'italic', color: 'gray' }}>
                            No Record found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
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
                        {/* <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Start Date</TableCell> */}
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Month</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Year</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Due Date</TableCell>
                        {/* <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Discount</TableCell>
                      <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Fine Amount</TableCell> */}
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Total Amount</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.arrDuePaymentDTO && state.arrDuePaymentDTO.length > 0 ? (
                        state.arrDuePaymentDTO.map((due, index) => (
                          <TableRow key={due.id ?? index} sx={{ height: 36, '& td': { py: 0.5, color: 'grey.800' } }}>
                            <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>{index + 1}</TableCell>
                            <TableCell>{due.learner_id}</TableCell>
                            <TableCell>{due.student_name}</TableCell>
                            <TableCell>{due.course_name}</TableCell>
                            {/* <TableCell>{due.start_date}</TableCell> */}
                            <TableCell>{due.fee_cycle_code}</TableCell>
                            <TableCell>{due.fee_year}</TableCell>
                            <TableCell>{formatDate(due.due_date)}</TableCell>
                            {/* <TableCell>{due.discount}</TableCell>
                          <TableCell>{due.fine_amount}</TableCell> */}
                            <TableCell>{due.fee_amount}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                variant="text"
                                onClick={() =>
                                  handlePayNow(due.course_name, calculatePayableAmount(due.fee_amount, due.fine_amount, due.discount), due)
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
      </MyCard>
    </>
  );
};

export default memo(ClientViewFeeStructure, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
