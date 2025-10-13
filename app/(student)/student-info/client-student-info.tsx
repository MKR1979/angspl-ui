
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import useStudentInfo from './useStudentInfo';
import MyTypography from '@/app/custom-components/MyTypography';

import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import MyImage from '@/app/custom-components/MyImage';

const InfoItem = ({ label, value }: { label: string; value?: string | number }) => (
  <MyGrid size={{ xs: 12, md: 6 }}>
    <MyBox sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <MyTypography variant="subtitle1" sx={{ fontWeight: 500, minWidth: 160 }}>
        {label}:
      </MyTypography>
      <MyTypography variant="subtitle2" sx={{ ml: 1 }}>
        {value ?? 'N/A'}
      </MyTypography>
    </MyBox>
  </MyGrid>
);

const ClientStudentInfo = () => {
  const { state, onImageError, onImageClick, UploadImage,formatDate, twelfthProofType, tenthProofType } = useStudentInfo();

 
  return (
    <MyCard>
      <MyCardContent>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Student Information</h1>
        <MyGrid container spacing={3}>
          {/* LEFT SIDE - INFO */}
          <MyGrid size={{ xs: 12, md: 8 }}>
            <MyTypography variant="h6" sx={{ mb: 2 }}>
              Personal Information
            </MyTypography>
            <MyGrid container spacing={2}>
              <InfoItem label="First Name" value={state.dtoAdmission.first_name} />
              <InfoItem label="Last Name" value={state.dtoAdmission.last_name} />
              <InfoItem label="Gender" value={state.dtoAdmission.gender} />
              <InfoItem label="DOB" value={formatDate(state.dtoAdmission.dob)} />
            </MyGrid>

            <MyDivider sx={{ my: 3 }} />

            <MyTypography variant="h6" sx={{ mb: 2 }}>
              Contact Information
            </MyTypography>
            <MyGrid container spacing={2}>
              <InfoItem label="Email" value={state.dtoAdmission.email} />
              <InfoItem label="Phone No" value={state.dtoAdmission.phone_no} />
              <InfoItem label="Address" value={state.dtoAdmission.address} />
              <InfoItem label="City" value={state.dtoAdmission.city_name} />
              <InfoItem label="State" value={state.dtoAdmission.state_name} />
              <InfoItem label="Country" value={state.dtoAdmission.country_name} />
              <InfoItem label="Zip Code" value={state.dtoAdmission.zip_code} />
            </MyGrid>

            <MyDivider sx={{ my: 3 }} />

            <MyTypography variant="h6" sx={{ mb: 2 }}>
              Academic Information
            </MyTypography>
            <MyGrid container spacing={2}>
              <InfoItem label="Course Name" value={state.dtoAdmission.course_name} />
              <InfoItem label="Admission Date" value={formatDate(state.dtoAdmission.admission_date)} />
              <InfoItem label="High School Name" value={state.dtoAdmission.highschoolname} />
              <InfoItem label="High School %" value={state.dtoAdmission.highschoolpercentage} />
              <InfoItem label="Higher School Name" value={state.dtoAdmission.highersschoolname} />
              <InfoItem label="Higher School %" value={state.dtoAdmission.highersschoolpercentage} />
              <InfoItem label="Graduation Name" value={state.dtoAdmission.graduationname} />
              <InfoItem label="Graduation %" value={state.dtoAdmission.graduationpercentage} />
              <InfoItem label="Tenth Proof" value={tenthProofType} />
              <InfoItem label="Twelfth Proof" value={twelfthProofType} />
            </MyGrid>
          </MyGrid>

          {/* RIGHT SIDE - IMAGE */}
          <MyGrid size={{ xs: 12, md: 4 }}>
            <MyBox sx={{ width: '175px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MyImage
                src={'/common/default-image.webp'}
                width={175}
                height={175}
                alt="profile picture"
                onClick={onImageClick}
                style={{ cursor: 'pointer', objectFit: 'cover', borderRadius: '8px' }}
                onError={onImageError}
              />
            </MyBox>
            <input
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*, .mp4"
              multiple
              id="Document_image"
              name="file"
              onChange={UploadImage}
              style={{ display: 'none' }}
            />
          </MyGrid>
        </MyGrid>
      </MyCardContent>
    </MyCard>
  );
};

export default memo(ClientStudentInfo, (prevProps, nextProps) => eq(prevProps, nextProps));
