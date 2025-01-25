import React, { Ref, ExoticComponent, ReactElement, memo } from 'react';

// material-ui
import eq from 'lodash/eq';
import MyBox from './MyBox';
import MyGrow from './MyGrow';
import MyCollapse from './MyCollapse';
import MyFade from './MyFade';
import MySlide from './MySlide';
import MyZoom from './MyZoom';

// ==============================|| TRANSITIONS ||============================== //

interface TSProps {
  children?: ReactElement;
  position?: string;
  sx?: React.CSSProperties;
  in?: boolean;
  type?: string;
  direction?: 'up' | 'right' | 'left' | 'down';
  [others: string]: any;
}

const MyTransitions = React.forwardRef(({ children, position, sx, type, direction, ...others }: TSProps, ref: Ref<ExoticComponent>) => {
  console.log(sx);
  let positionSX = {
    transformOrigin: '0 0 0'
  };

  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right'
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top'
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left'
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right'
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom'
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0'
      };
      break;
  }

  return (
    <MyBox ref={ref}>
      {type === 'grow' && (
        <MyGrow {...others}>
          <MyBox sx={positionSX}>{children}</MyBox>
        </MyGrow>
      )}
      {type === 'collapse' && (
        <MyCollapse {...others} sx={positionSX}>
          {children}
        </MyCollapse>
      )}
      {type === 'fade' && (
        <MyFade
          {...others}
          timeout={{
            appear: 500,
            enter: 600,
            exit: 400
          }}
        >
          <MyBox sx={positionSX}>{children}</MyBox>
        </MyFade>
      )}
      {type === 'slide' && (
        <MySlide
          {...others}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200
          }}
          direction={direction}
        >
          <MyBox sx={positionSX}>{children}</MyBox>
        </MySlide>
      )}
      {type === 'zoom' && (
        <MyZoom {...others}>
          <MyBox sx={positionSX}>{children}</MyBox>
        </MyZoom>
      )}
    </MyBox>
  );
});
MyTransitions.displayName = 'MyTransitions';
// MyTransitions.defaultProps = {
//   type: 'grow',
//   position: 'top-left',
//   direction: 'up'
// };

export default memo(MyTransitions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
