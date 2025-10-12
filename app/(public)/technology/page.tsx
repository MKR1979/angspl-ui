import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { COMPANY } from '.././constants/constants';
import './technology.css';

const technologies = [
  {
    program: 'Front-end',
    stack: 'React, Redux, React Native, Angular, TypeScript, NgRX, Jest, JavaScript, CSS, and HTML5'
  },
  {
    program: 'Back-end',
    stack: 'Node JS, C#, .NET Core, Web APIs, OpenAPI, Generative AI, Rest APIs, Microservice, Jest, Mock and x-Unit'
  },
  {
    program: 'Storage / Databases',
    stack: 'SQL Server, PostgreSQL, MongoDB, Cosmos DB, and Blob Storage'
  },
  {
    program: 'Cloud (Azure / AWS)',
    stack:
      'AWS, Azure (Web Apps, Web Job, Azure Data Factory, Azure Storage, App Insights, Azure Functions, Service Bus, Font Door, APIM, Logic App, Azure Service Principals, Azure Key Vault, Blob Storage, Azure Event Hub, Event Grid, Service Bus and Managed Identities, AD B2C, IAM, OAuth 2.0, Elastic Search, Cloud-Native Services, AKS)'
  },
  {
    program: 'DevOps',
    stack:
      'Terraform (IaC), Dockers, Kubernetes, Jenkins, Git/GitLab, Azure DevOps, CI/CD, ARM/YAML, PowerShell, AI & ML, Azure Kubernetes Service, Helm chart'
  },
  {
    program: 'Design (Solutioning)',
    stack:
      '12 Factor App, Cloud-Native Microservices, DDD, CQRS, Event Sourcing, Saga, Serverless, Microservices Architecture, Distributed Architecture, SOLID, OOD, C4 Model, HLD & LLD, Event-Driven Architecture, SOA'
  },
  {
    program: 'Tools / Process',
    stack: 'Agile PSM, Jira, Visio, Pega, ServiceNow, BPM (Process360),'
  }
];

const TechnologyPage: React.FC = () => {
  return (
      <div className="page-wrapper">
      {/* Main content */}
      <div className="content">
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Technology Expertise
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', border: '1px solid #e0e0e0', padding: '12px 16px', lineHeight: 1.2, width: '20%' }}>
                    Program
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', border: '1px solid #e0e0e0', padding: '12px 16px', lineHeight: 1.2 }}>
                    Primary Technology Stack
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {technologies.map((tech) => (
                  <TableRow key={tech.program}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{tech.program}</TableCell>
                    <TableCell>{tech.stack}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© Copyright 2025 {COMPANY}, All rights reserved.</p>
        <div>
          <a href="/terms">Terms of use</a> | <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </div>

    // <div className="page-wrapper">
    //   <div className="content">
    //     <Box sx={{ p: 4 }}>
    //       <Typography variant="h5" gutterBottom>
    //         Technology Expertise
    //       </Typography>
    //       <TableContainer component={Paper}>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell className="table-header">Program</TableCell>
    //               <TableCell className="table-header">Primary Technology Stack</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {technologies.map((tech) => (
    //               <TableRow key={tech.program} className="table-row">
    //                 <TableCell>{tech.program}</TableCell>
    //                 <TableCell>{tech.stack}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </TableContainer>
    //     </Box>
    //   </div>

    //   <div className="footer">
    //     <p>© Copyright 2025 {COMPANY}, All rights reserved.</p>
    //     <div>
    //       <a href="/terms">Terms of use</a> | <a href="/privacy-policy">Privacy Policy</a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TechnologyPage;
