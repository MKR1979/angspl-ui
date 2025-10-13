// 'use client';
// import { memo } from 'react';
// import eq from 'lodash/eq';
// import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
// import useStudentDashboard from './useStudentDashboard';

// const ClientStudentDashboard = () => {
//   const { state } = useStudentDashboard();

//   return (
//     <>
//       <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>
//     </>
//   );
// };

// export default memo(ClientStudentDashboard, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Don't re-render!
// });
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import useStudentDashboard from './useStudentDashboard';
import './DashboardsStyles.css';

const ClientStudentDashboard = () => {
  const { state } = useStudentDashboard();

  // This array can represent the completed milestones or you can make it dynamic if you need.
  const completedMilestones = [
    'start_course',  // Example: Milestone with key 'start_course' is completed
    'finish_lessons',  // Example: Milestone with key 'finish_lessons' is completed
  ];

  const milestones = [
    { label: 'Start the Meet the Visual Suite course', key: 'start_course' },
    { label: 'Integrate work apps to Canva', key: 'integrate_apps' },
    { label: 'Earn a Design School badge', key: 'earn_badge' },
    { label: 'Share the course with a colleague', key: 'share_course' },
    { label: 'Finish 5 lessons', key: 'finish_lessons' },
    { label: 'Complete a Learn & Play activity', key: 'complete_activity' },
    { label: 'Add a doc, presentation, social post, and sheet in one design', key: 'add_doc' },
    { label: 'Learn 3 presentation shortcuts', key: 'learn_shortcuts' },
    { label: 'Discover what\'s next at the keynote', key: 'discover_keynote' }
  ];

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>
      <div className="dashboard-container">
        <h2>Design School Bingo</h2>
        <p>How many milestones have you checked off?</p>
        <div className="milestone-grid">
          {milestones.map((milestone) => (
            <div key={milestone.key} className="milestone-item">
              <div className={`milestone-label ${completedMilestones.includes(milestone.key) ? 'checked' : ''}`}>
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(ClientStudentDashboard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
// 'use client';
// import { memo } from 'react';
// import eq from 'lodash/eq';
// import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
// import useStudentDashboard from './useStudentDashboard';
// import { Box, Typography } from '@mui/material'; // For layout and typography
// import './DashboardsStyles.css'; // Custom CSS for styling

// const ClientStudentDashboard = () => {
//   const { state } = useStudentDashboard();

//   const completedMilestones = [
//     'start_course', 'finish_lessons',
//   ];

//   const milestones = [
//     { label: 'Start the Meet the Visual Suite course', key: 'start_course' },
//     { label: 'Integrate work apps to Canva', key: 'integrate_apps' },
//     { label: 'Earn a Design School badge', key: 'earn_badge' },
//     { label: 'Share the course with a colleague', key: 'share_course' },
//     { label: 'Finish 5 lessons', key: 'finish_lessons' },
//     { label: 'Complete a Learn & Play activity', key: 'complete_activity' },
//     { label: 'Add a doc, presentation, social post, and sheet in one design', key: 'add_doc' },
//     { label: 'Learn 3 presentation shortcuts', key: 'learn_shortcuts' },
//     { label: 'Discover what\'s next at the keynote', key: 'discover_keynote' }
//   ];

//   return (
//     <>
//       <MyBreadcrumbs items={state.breadcrumbItems}></MyBreadcrumbs>

//       <Box className="dashboard-container">
//         <Typography variant="h2" className="dashboard-heading">
//           Design School Bingo
//         </Typography>
//         <Typography variant="body1" className="dashboard-subheading">
//           How many milestones have you checked off?
//         </Typography>

//         <Box className="milestone-grid">
//           {milestones.map((milestone) => (
//             <Box
//               key={milestone.key}
//               className={`milestone-item ${completedMilestones.includes(milestone.key) ? 'checked' : ''}`}
//             >
//               <Typography variant="body2" className="milestone-label">
//                 {milestone.label}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default memo(ClientStudentDashboard, (prevProps, nextProps) => {
//   return eq(prevProps, nextProps); // Prevent re-renders
// });
