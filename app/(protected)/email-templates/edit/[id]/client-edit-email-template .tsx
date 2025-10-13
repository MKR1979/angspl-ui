'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import EmailTemplateEntry from '../../email-template-entry';
import useEditEmailTemplate from './useEditEmailTemplate';
import EmailTemplateDTO from '@/app/types/EmailTemplateDTO';

type Props = { dtoEmailTemplate: EmailTemplateDTO };

const ClientEditEmailTemplate = ({ dtoEmailTemplate }: Props) => {
  const { state } = useEditEmailTemplate();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <EmailTemplateEntry dtoEmailTemplate={dtoEmailTemplate} />
    </>
  );
};

export default memo(ClientEditEmailTemplate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
