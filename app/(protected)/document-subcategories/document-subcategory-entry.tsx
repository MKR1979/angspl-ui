'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useDocumentSubcategoryEntry from './useDocumentSubcategoryEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import DocumentSubcategoryDTO from '@/app/types/DocumentSubcategoryDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';

type DocumentSubcategoryEntryProps = {
  dtoDocumentSubcategory: DocumentSubcategoryDTO;
  arrDocumentCategoryLookup: LookupDTO[];
};

const DocumentSubcategoryEntry = (props: DocumentSubcategoryEntryProps) => {
  const {
    state,
    onInputChange,
    onDocumentCategoryNameChange,
    onDocumentSubcategoryNameBlur,
    onDocumentCategoryNameBlur,
    onSaveClick,
    onCancelClick
  } = useDocumentSubcategoryEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Document Subcategory Name"
              name="document_subcategory_name"
              value={state.dtoDocumentSubcategory.document_subcategory_name}
              onChange={onInputChange}
              onBlur={onDocumentSubcategoryNameBlur}
              error={state.errorMessages.document_subcategory_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.document_subcategory_name}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              value={{ id: state.dtoDocumentSubcategory.document_category_id, text: state.dtoDocumentSubcategory.document_category_name }}
              getOptionLabel={(option: any) => option.text || ''}
              firstitem={{ id: 0, text: '' }}
              options={state.arrDocumentCategoryLookup}
              onChange={onDocumentCategoryNameChange}
              onBlur={onDocumentCategoryNameBlur}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Document Category"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  onBlur={onDocumentCategoryNameBlur}
                  error={state.errorMessages.document_category_id ? true : false}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.document_category_id}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(DocumentSubcategoryEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
