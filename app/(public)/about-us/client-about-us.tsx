'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import { CardHeader } from '@mui/material';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyApiIcon from '@/app/custom-components/MyApiIcon';
import './about-us.css';
import Footer from '@/app/custom-components/my-footer/MyFooter';

const ClientAboutUs = () => {
  return (
    <>
      <div>
        <div className="about-content">
          <br></br>
          <br></br>
        </div>
        <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <MyCardContent>
          <MyGrid container spacing={2} alignItems="stretch">
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Who We Are</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                At Adhyayan NextGen Solutions Pvt. Ltd., we are dedicated to driving digital transformation through cutting-edge technology. 
                We specialize in ERP, CRM, cloud solutions, DevOps, cybersecurity, and custom enterprise applications, helping businesses optimize operations, enhance customer engagement, and scale efficiently. 
                Our expertise spans across education, healthcare, retail, e-commerce, and manufacturing, where we deliver tailored solutions to streamline workflows and accelerate growth..
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Mission</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                Our mission is to empower businesses with smart, scalable, and secure technology solutions that improve efficiency and drive success. Whether it’s ERP for seamless business automation, 
                AI-powered admission systems, secure payment processing,
                 or cloud-based hospital management, we ensure our clients stay ahead in a rapidly evolving digital landscape.
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Vision</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                We envision a world where technology bridges the gap between business challenges and success—where enterprises, educational institutions, 
                and industries operate with seamless automation, data-driven insights, and secure, integrated systems.
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>What We Do</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  We provide comprehensive technology solutions tailored to industry-specific needs:
                  <ul>
                    <li>
                      <b>Enterprise Resource Planning (ERP)</b> – Automating business processes for operational efficiency.
                    </li>
                    <li>
                      <b>Customer Relationship Management (CRM)</b> – Enhancing sales, customer engagement, and data-driven decision-making.
                    </li>
                    <li>
                      <b>Education Solutions (College & School ERP, E-Learning)</b> – Smart learning platforms and digital admission systems.
                    </li>
                    <li>
                      <b>Billing & Payment Processing</b> – Secure financial transactions with automated invoicing.
                    </li>
                    <li>
                      <b>Inventory & Supply Chain Management</b> – Real-time tracking for optimized logistics.
                    </li>
                    <li>
                      <b>Cybersecurity & Compliance</b> – Protecting business data with advanced security frameworks.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Values</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  <ul>
                    <li>
                      <b>Innovation:</b> Constantly evolving to meet dynamic industry demands.
                    </li>
                    <li>
                      <b>Customer Success:</b> Prioritizing client growth and satisfaction.
                    </li>
                    <li>
                      <b>Integrity:</b> Building trust through transparency and reliability.
                    </li>
                    <li>
                      <b>Collaboration:</b>Partnering with businesses to create impactful solutions.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Why Choose Us?</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  <ul>
                    <li>
                      <b>Custom-Built Solutions:</b>Tailored to fit diverse business needs..
                    </li>
                    <li>
                      <b>User-Centric Approach:</b>Intuitive platforms designed for seamless adoption.
                    </li>
                    <li>
                      <b>End-to-End Support:</b>Dedicated assistance to ensure business success.
                    </li>
                    <li>
                      <b>Proven Impact:</b>Trusted by leading enterprises, educational institutions, and startups.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Success Stories: Driving Transformation</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  <ul>
                    <li>
                      <b>Education:</b>TImplemented an AI-powered admission system, reducing manual workload by 80% and boosting enrollments.
                    </li>
                    <li>
                      <b>Retail & E-Commerce:</b>Developed a custom CRM, increasing sales by 30% through automated customer engagement.
                    </li>
                    <li>
                      <b>Healthcare:</b>Built a cloud-based billing & hospital management system (HMS), streamlining operations and ensuring compliance.
                    </li>
                    <li>
                      <b>Manufacturing:</b>Designed a real-time inventory solution, cutting costs by 25% and improving efficiency.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Meet the Team</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  Behind every great innovation is a team of passionate engineers, cloud architects, cybersecurity experts,
                   and business strategists. At Adhyayan NextGen Solutions Pvt. Ltd., we work together to deliver powerful, 
                   scalable, and secure technology solutions that redefine business success.
                </MyCardContent>
              </MyCard>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
      </MyCard>
            <Footer />
      </div>
    </>
  );
};

export default memo(ClientAboutUs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});