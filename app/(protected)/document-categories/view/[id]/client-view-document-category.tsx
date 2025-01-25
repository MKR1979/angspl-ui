'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewDocumentCategory from './useViewDocumentCategory';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import DocumentCategoryDTO from '@/app/types/DocumentCategoryDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoDocumentCategory: DocumentCategoryDTO;
};

const ClientViewDocumentCategory = ({ dtoDocumentCategory }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewDocumentCategory({ dtoDocumentCategory });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyTypography variant="subtitle2">Document Category Name:</MyTypography>
              <MyTypography>{state.dtoDocumentCategory.document_category_name}</MyTypography>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoDocumentCategory.created_by_user_name}
          createdAt={state.dtoDocumentCategory.created_at}
          modifiedBy={state.dtoDocumentCategory.modified_by_user_name}
          modifiedAt={state.dtoDocumentCategory.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewDocumentCategory, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
