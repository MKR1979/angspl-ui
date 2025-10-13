'use client';
import { memo } from 'react';
import { eq } from 'lodash';
import useContactUs from './useContactUs';
import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaYoutube } from 'react-icons/fa';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import * as gConstants from '../../constants/constants';
import * as Constants from '../constants/constants';
import MyTextField from '@/app/custom-components/MyTextField';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import { useSelector } from '../../store';

const formatUrl = (url: any) => (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`);

const StyledPaper = styled(Paper)(() => ({
  padding: '1rem',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#1976d2'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2'
    }
  }
});

const ClientVisionContactUs = () => {
  const {
    state,
    isChecked,
    onInputChange,
    onPhoneNoChange,
    handleCheckboxChange,
    onContactNameBlur,
    onEMailIdBlur,
    onPhoneNoBlur,
    onSaveClick,
    setOpen1,
    setClose1,
    onStatusChange,
    onMessageBlur,
    onNormalizedInputChange
  } = useContactUs();

  const { companyInfo } = useSelector((state) => state.globalState);
  const { siteConfig } = useSelector((state) => state.siteConfigState);

  const OFFICE_LOCATION = {
    lat: Number(siteConfig.find((c) => c.key === 'OFFICE_LATITUDE')?.value ?? 0),
    lng: Number(siteConfig.find((c) => c.key === 'OFFICE_LONGITUDE')?.value ?? 0)
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
          Contact Us
        </Typography>
        <Typography sx={{ mb: 3, fontSize: '20px', textAlign: 'center' }}>
          We&rsquo;re here to help! Fill out the form below and we&rsquo;ll get back to you as soon as possible.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MyTextField
                    required
                    fullWidth
                    label="Name"
                    name="contact_name"
                    onBlur={onContactNameBlur}
                    value={state.dtoContactPoint.contact_name}
                    onChange={onInputChange}
                    inputProps={{
                      maxLength: gConstants.FIRST_NAME_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    aria-label="Name"
                    helperText={state.errorMessages.contact_name}
                    error={!!state.errorMessages.contact_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyTextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onBlur={onEMailIdBlur}
                    value={state.dtoContactPoint.email}
                    onChange={onNormalizedInputChange}
                    inputProps={{
                      maxLength: gConstants.EMAIL_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                    aria-label="Email"
                    error={!!state.errorMessages.email}
                    helperText={state.errorMessages.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyPhoneNumber
                    label="Phone #"
                    onChange={onPhoneNoChange}
                    value={state.dtoContactPoint.phone_no}
                    onBlur={onPhoneNoBlur}
                    error={!!state.errorMessages.phone_no}
                    helperText={state.errorMessages.phone_no}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyAutocomplete
                    open={state.open1}
                    onOpen={setOpen1}
                    onClose={setClose1}
                    value={{ text: state.dtoContactPoint.category_name }}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrEnquiryCategoryLookup}
                    onChange={onStatusChange}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Category"
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={state.dtoContactPoint.subject}
                    onChange={onInputChange}
                    aria-label="Subject"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    multiline
                    rows={2}
                    label="Message"
                    name="message"
                    value={state.dtoContactPoint.message}
                    onChange={onInputChange}
                    onBlur={onMessageBlur}
                    aria-label="Message"
                    error={!!state.errorMessages.message}
                    helperText={state.errorMessages.message}
                  />
                </Grid>
                <MyGrid size={{ xs: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '25px' }}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />I consent to receiving phone calls
                    regarding my inquiry.
                  </label>
                </MyGrid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  height: 46,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none'
                }}
                onClick={onSaveClick}
              >
                Send Message
              </Button>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper sx={{ height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Get in Touch
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FaMapMarkerAlt size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                  <Typography
                    sx={{
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {companyInfo.company_address}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FaPhone size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                  <Typography>
                    <a href={`tel:${companyInfo.company_phone_no}`}>{companyInfo.company_phone_no}</a>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FaEnvelope size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                  <Typography>
                    <strong>Email:</strong> <a href={`mailto:${companyInfo.company_email}`}>{companyInfo.company_email}</a>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <FaEnvelope size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                  <Typography>
                    <strong>Site URL:</strong>{' '}
                    <a href={formatUrl(companyInfo.domain_name)} target="_blank" rel="noopener noreferrer">
                      {companyInfo.domain_name}
                    </a>{' '}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <FaYoutube size={24} style={{ marginRight: '1.1rem', color: '#FF0000' }} />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography component="span">
                      <strong>YouTube Channel Url:</strong>{' '}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere'
                      }}
                    >
                      <a href={Constants.YOUTUBE_CHANNER_URL} target="_blank" rel="noopener noreferrer">
                        {Constants.YOUTUBE_CHANNER_URL}
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{ mt: 1 }}>
                <iframe
                  src={`https://www.google.com/maps?q=${OFFICE_LOCATION.lat},${OFFICE_LOCATION.lng}&hl=en&z=15&output=embed`}
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '5px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default memo(ClientVisionContactUs, (prevProps, nextProps) => eq(prevProps, nextProps));
