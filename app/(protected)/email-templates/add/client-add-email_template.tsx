'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EmailTemplateEntry from '../email-template-entry';
import useAddEmailTemplate  from './useAddEmailTemplate';
import { EMAIL_TEMPLATE } from '@/app/types/EmailTemplateDTO';

const ClientAddEmailTemplate  = () => {
  const { state } = useAddEmailTemplate();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EmailTemplateEntry dtoEmailTemplate={EMAIL_TEMPLATE} />
    </>
  );
};

export default memo(ClientAddEmailTemplate , (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
