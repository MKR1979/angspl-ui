'use client'
import { memo } from 'react';
import { eq } from 'lodash';
import useContactUs from './useContactUs';
import React from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { FaMapMarkerAlt, FaPhone, FaEnvelope,FaBuilding} from 'react-icons/fa';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import  * as gConstants  from '../../constants/constants';
import MyTextField from '@/app/custom-components/MyTextField';


const formatUrl = (url: any) =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;

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

const categories = [
  { value: 'support', label: 'Support' },
  { value: 'sales', label: 'Sales' },
  { value: 'general', label: 'General Inquiry' }
];

const ClientContactUs = () => {  
  const {
    state,
    onInputChange,
    onPhoneNoChange,
    onContactNameBlur,
    onEMailIdBlur,
    onPhoneNoBlur,
    onSaveClick,
  } = useContactUs();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
        Contact Us
      </Typography>
      <Typography  sx={{ mb: 3, fontSize:'20px', textAlign: 'center'}}>
        We&rsquo;re here to help! Fill out the form below and we&rsquo;ll get back to you as soon as possible.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <StyledPaper >
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
                    maxLength: 30, // Restricts input to two characters
                    pattern: "^[A-Za-z]{1,2}$", // Allows only up to two letters (A-Z, a-z)
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
                  onChange={onInputChange}
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
                <MyTextField
                  fullWidth
                  select
                  label="Category"
                  name="category_name"
                  value={state.dtoContactPoint.category_name}
                  onChange={onInputChange}
                  aria-label="Category"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MyTextField>
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
                  rows={4}
                  label="Message"
                  name="message"
                  value={state.dtoContactPoint.message}
                  onChange={onInputChange}
                  aria-label="Message"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                height: 56, 
                borderRadius: 2,
                fontSize: '1.1rem',
                textTransform: 'none'
              }} onClick={onSaveClick}
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
                <FaBuilding size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                <Typography>
                  {gConstants.HO_ADDRESS1}
                  <br />
                  {gConstants.HO_ADDRESS2}
                  <br />
                  {gConstants.HO_ADDRESS3}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <FaMapMarkerAlt size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                <Typography>
                  {gConstants.ADDRESS1}
                  <br />
                  {gConstants.ADDRESS2}
                  <br />
                  {gConstants.ADDRESS3}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <FaPhone size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                <Typography><a href={`tel:${gConstants.CONTACT_PHONE_NO}`}>{gConstants.CONTACT_PHONE_NO}</a></Typography>
              </Box>             
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaEnvelope size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                <Typography><strong>Email:</strong> <a href={`mailto:${gConstants.CONTACT_EMAIL}`}>{gConstants.CONTACT_EMAIL}</a></Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaEnvelope size={24} style={{ marginRight: '1rem', color: '#1976d2' }} />
                <Typography><strong>Site URL:</strong> <a href={formatUrl(gConstants.SITE_URL_COMPANY)} target="_blank" rel="noopener noreferrer">{gConstants.SITE_URL_COMPANY}</a>,and <a href={formatUrl(gConstants.SITE_URL_ONLINE)} target="_blank" rel="noopener noreferrer">{gConstants.SITE_URL_ONLINE}</a></Typography>
              </Box>              
              </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(ClientContactUs, (prevProps, nextProps) => eq(prevProps, nextProps));
