import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import MyHomeIcon from './MyHomeIcon';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import MyTypography from './MyTypography';
export interface BreadcrumbsItem {
  label: string;
  href?: string;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? 'rgb(238, 242, 246)' : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06)
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    }
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function MyBreadcrumbs({ items }: { items: BreadcrumbsItem[] }) {
  return (
    <div role="presentation" style={{ paddingBottom: '7px', borderBottom: '1px solid #CED0CE' }}>
      <MyTypography
        sx={{ fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #CED0CE', marginBottom: '5px', paddingBottom: '5px' }}
      >
        {items[items.length - 1].label}
      </MyTypography>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link href="/dashboard">
          <StyledBreadcrumb label="Home" icon={<MyHomeIcon fontSize="small" />} style={{ cursor: 'pointer' }} />
        </Link>
        {items.map((item, index) => {
          if (index < items.length - 1) {
            return (
              <Link key={item.label} href={{ pathname: item.href }}>
                <StyledBreadcrumb key={item.label} label={item.label} style={{ cursor: 'pointer' }} />
              </Link>
            );
          }
          return (
            <MyTypography key={item.label} variant="body2">
              {item.label}
            </MyTypography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
