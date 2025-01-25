'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import { CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MyTabPanel from '@/app/custom-components/MyTabPanel';
import MyTabs from '@/app/custom-components/MyTabs';
import MyTab from '@/app/custom-components/MyTab';

import usePricing from './usePricing';

const ClientPricing = () => {
  const { state, handleTabChange } = usePricing();
  const rows = [
    {
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9
    }
  ];
  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyTypography sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} component="h1" variant="h4" gutterBottom>
              Choose Your Plan
            </MyTypography>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>Select the perfect plan for your needs</MyBox>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <MyTabs value={state.tabIndex} onChange={handleTabChange}>
                <MyTab label="Monthly Billing" />
                <MyTab label="Annual Billing" />
              </MyTabs>
            </MyBox>
            <MyTabPanel value={state.tabIndex} index={0}>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Basic</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$130.00</div>
                      <div>Per Month</div>
                      <br></br>
                      <div>Billed Monthly Excludes VAT</div>
                      <br></br>
                      <div>
                        Entry level, fully managed and supported shared hosting for organisations with limited CRM data and automation
                        requirements. Recommended for up to 10 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton fullWidth>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Professional</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$180.00</div>
                      <div>Per Month</div>
                      <br></br>
                      <div>Billed Monthly Excludes VAT</div>
                      <br></br>
                      <div>
                        Shared hosting with enhanced performance, additional storage and business focused features. Recommended for up to 50
                        Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Premium</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$280.00</div>
                      <div>Per Month</div>
                      <br></br>
                      <div>Billed Monthly Excludes VAT</div>
                      <br></br>
                      <div>
                        Our highest performance shared hosting package with a large storage capacity and greater flexibility. Recommended
                        for up to 150 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Dedicated</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>from $3200</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Excludes VAT & Application Support</div>
                      <br></br>
                      <div>
                        Enterprise grade, fully managed instance with dedicated resources, scalable performance and the ultimate
                        flexability.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Contact Us</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyTabPanel>
            <MyTabPanel value={state.tabIndex} index={1}>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Basic</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$130.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Entry level, fully managed and supported shared hosting for organisations with limited CRM data and automation
                        requirements. Recommended for up to 10 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton fullWidth>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Professional</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$180.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Shared hosting with enhanced performance, additional storage and business focused features. Recommended for up to 50
                        Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Premium</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>$280.00</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Billed Annually Excludes VAT</div>
                      <br></br>
                      <div>
                        Our highest performance shared hosting package with a large storage capacity and greater flexibility. Recommended
                        for up to 150 Users.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Try It Free</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                  <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardHeader
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Dedicated</span>}
                      sx={{ textAlign: 'center', height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                    >
                      <div style={{ fontSize: '26px' }}>from $3200</div>
                      <div>Per Year</div>
                      <br></br>
                      <div>Excludes VAT & Application Support</div>
                      <br></br>
                      <div>
                        Enterprise grade, fully managed instance with dedicated resources, scalable performance and the ultimate
                        flexability.
                      </div>
                      <br></br>
                      <div style={{ paddingBottom: '10px' }}>
                        <MyButton>Compare Plans</MyButton>
                      </div>
                      <div>
                        <MyButton>Contact Us</MyButton>
                      </div>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyTabPanel>
          </MyCardContent>
        </MyCard>
      </MyBox>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyGrid container spacing={2} alignItems="stretch">
              <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Features</TableCell>
                        <TableCell align="right">Basic</TableCell>
                        <TableCell align="right">Professional</TableCell>
                        <TableCell align="right">Premium</TableCell>
                        <TableCell align="right">Dedicated</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MyGrid>
            </MyGrid>
          </MyCardContent>
        </MyCard>
      </MyBox>
    </div>
  );
};

export default memo(ClientPricing, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
