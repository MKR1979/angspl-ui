'use client';

import { useMemo } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyBox from '@/app/custom-components/MyBox';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import useRolePermissionList from './useRolePermissionList';
import RolePermissionDTO from '@/app/types/RolePermissionDTO';
import MyTypography from '@/app/custom-components/MyTypography';

const ClientRolePermissionList = () => {
  const {
    state,
    onRoleNameChange,
    handleGrantCheckboxChange,
    isAllGranted,
    handleGrantAllChange,
    setClose1,
    setOpen1,
    setClose2,
    setOpen2,
    arrRolePermissionFilter,
    onModuleNameChange
  } = useRolePermissionList();

  const groupedPermissions = useMemo(() => {
    const map: { [key: string]: RolePermissionDTO[] } = {};
    arrRolePermissionFilter.forEach((item: any) => {
      if (!map[item.module_name]) map[item.module_name] = [];
      map[item.module_name].push(item);
    });
    return map;
  }, [arrRolePermissionFilter]);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems} />
      <MyLocalizationProvider>
        <MyBox sx={{ mb: '10px' }}>
          <MyGrid container spacing={2} style={{ border: '3px solid rgb(238, 242, 246)', padding: '1rem' }}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoRolePermission.role_id, text: state.dtoRolePermission.role_name }}
                getOptionLabel={(option: any) => option.text || ''}
                firstitem={{ id: 0, text: '' }}
                options={state.arrRoleLookup}
                onChange={onRoleNameChange}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => <MyTextField {...params} label="Roles" slotProps={{ inputLabel: { shrink: true } }} />}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={
                  state.dtoRolePermission.module_id === null
                    ? { id: 'ALL', text: 'All' }
                    : { id: state.dtoRolePermission.module_id, text: state.dtoRolePermission.module_name }
                }
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrModuleLookup}
                onChange={onModuleNameChange}
                filterOptions={(options, state) => {
                  // searchable lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Modules"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    placeholder="Select Module..."
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.module_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyBox>
      </MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ height: 25 }}>
                  <TableCell sx={{ py: 0, width: '50%' }}>
                    <strong>Module Name</strong>
                  </TableCell>
                  <TableCell sx={{ py: 0, width: '50%' }}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={isAllGranted}
                        onChange={handleGrantAllChange}
                        size="medium"
                        sx={{
                          ml: -2,
                          '& .MuiSvgIcon-root': { fontSize: 26 }
                        }}
                      />
                      <Box component="span" fontWeight="bold">
                        Grant Permissions
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ height: 25 }}>
                {Object.entries(groupedPermissions).map(([moduleName, options]) =>
                  options.map((option, index) => (
                    <TableRow key={option.id}>
                      {/* <TableRow key={option.id && option.id !== 0 ? option.id : option.temp_id}> */}
                      {index === 0 && (
                        <TableCell rowSpan={options.length} sx={{ verticalAlign: 'centre', py: 0, width: '50%' }}>
                          {moduleName}
                        </TableCell>
                      )}
                      <TableCell sx={{ py: 0, width: '50%' }}>
                        <Checkbox
                          checked={option.grant || false}
                          onChange={(e) => handleGrantCheckboxChange(option, e.target.checked)}
                          size="medium"
                          sx={{
                            ml: -2,
                            '& .MuiSvgIcon-root': { fontSize: 26 }
                          }}
                        />
                        {option.option_name}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default ClientRolePermissionList;
