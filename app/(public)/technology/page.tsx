
'use client';
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Footer from '@/app/custom-components/my-footer/MyFooter';
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
      'AWS, Azure (Web Apps, Web Job, Azure Data Factory, Azure Storage, App Insights, Azure Functions, Service Bus, Front Door, APIM, Logic App, Azure Service Principals, Azure Key Vault, Blob Storage, Azure Event Hub, Event Grid, Service Bus, Managed Identities, AD B2C, IAM, OAuth 2.0, Elastic Search, Cloud-Native Services, AKS)'
  },
  {
    program: 'DevOps',
    stack:
      'Terraform (IaC), Dockers, Kubernetes, Jenkins, Git/GitLab, Azure DevOps, CI/CD, ARM/YAML, PowerShell, AI & ML, Azure Kubernetes Service, Helm chart'
  },
  {
    program: 'AI / ML',
    stack:
      'Generative AI, Agentic AI, Machine Learning, Deep Learning, NLP, Computer Vision, OpenAI, TensorFlow, PyTorch, LangChain'
  },
  {
    program: 'Design (Solutioning)',
    stack:
      '12 Factor App, Cloud-Native Microservices, DDD, CQRS, Event Sourcing, Saga, Serverless, Microservices Architecture, Distributed Architecture, SOLID, OOD, C4 Model, HLD & LLD, Event-Driven Architecture, SOA'
  },
  {
    program: 'Tools / Process',
    stack: 'Agile PSM, Jira, Visio, Pega, ServiceNow, BPM (Process360)'
  }
];

const TechnologyPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="page-wrapper">
      <div className="content">
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 2,
              color: '#334D6E',
              fontWeight: 'bold',
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: '1.3rem', sm: '1.6rem' }
            }}
          >
            Technology Expertise
          </Typography>

          {/* ✅ Desktop View (Table) */}
          {!isMobile && (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid #cfd8dc'
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#f0f4f8' }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        borderBottom: '2px solid #cfd8dc',
                        width: '25%',
                        borderRight: '1px solid #cfd8dc'
                      }}
                    >
                      Program
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        borderBottom: '2px solid #cfd8dc'
                      }}
                    >
                      Primary Technology Stack
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {technologies.map((tech, idx) => (
                    <TableRow
                      key={tech.program}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fbfd',
                        '&:hover': {
                          backgroundColor: '#e8f1ff',
                          cursor: 'pointer'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          color: '#1a3e72',
                          borderRight: '1px solid #cfd8dc',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tech.program}
                      </TableCell>
                      <TableCell sx={{ color: '#333', lineHeight: 1.6 }}>{tech.stack}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* ✅ Mobile View (Card Layout) */}
          {isMobile && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {technologies.map((tech) => (
                <Card
                  key={tech.program}
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, color: '#1a3e72', mb: 0.5 }}
                    >
                      {tech.program}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>
                      {tech.stack}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
