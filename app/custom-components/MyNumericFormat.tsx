// import { memo } from 'react';
// import { NumericFormat, NumericFormatProps } from 'react-number-format';
// import eq from 'lodash/eq';
// import React from 'react';

// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// }
// const MyNumericFormat = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
//   const { onChange, ...other } = props;

//   return (
//     <NumericFormat
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value
//           }
//         });
//       }}
//       thousandSeparator
//       valueIsNumericString
//       prefix="$"
//       {...other}
//     />
//   );
// });

// export default memo(MyNumericFormat, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Don't re-render!
// });
import { memo } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import eq from 'lodash/eq';
import React from 'react';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  prefix?: string; // 👈 Add this to support dynamic prefix
}

const MyNumericFormat = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, prefix, ...other } = props; // 👈 Destructure prefix here

  return (
    <NumericFormat
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ? `${prefix} ` : undefined}
      {...other}
    />
  );
});

export default memo(MyNumericFormat, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
