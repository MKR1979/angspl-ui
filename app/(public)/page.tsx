import styles from './page.module.css';
import MyBox from '../custom-components/MyBox';
import MyCard from '../custom-components/MyCard';
import MyCardContent from '../custom-components/MyCardContent';
import MyGrid from '../custom-components/MyGrid';
import { COMPANY } from '.././constants/constants';
import MyCheckCircleIcon from '../custom-components/MyCheckCircleIcon';
import MyApiIcon from '../custom-components/MyApiIcon';
import { CardHeader } from '@mui/material';

export default function Home() {
  return (
    <div style={{ width: '100%', padding: '0px' }}>
      <h2 className="rolling-header"> {COMPANY}</h2>     
       <div
        style={{
          // backgroundImage: 'url(/hero2.png)',
          backgroundImage: 'url(/home-page/homePage.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
          width: '100%',
          height: '365px'
         }}
      >
        {/* <div className={styles.hero_text}>
          <h1 style={{ fontSize: '50px' }}>Next-Gen Technology for Next-Level Growth</h1>
        </div> */}
      </div>
      <style>
        {`
          @keyframes rollingText {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }

          .rolling-header {
            white-space: nowrap;
            overflow: hidden;
           
            animation: rollingText 12s linear infinite;
          }
        `}
      </style>
      <div>
        <MyBox>
          <MyCard>
            <MyCardContent>
              <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                 <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                   <CardHeader
                     avatar={<MyApiIcon></MyApiIcon>}
                     title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Welcome to Adhyayan NextGen Solutions Pvt. Ltd.</span>}
                     sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                   />
                   <MyCardContent>
                    At Adhyayan NextGen Solutions Pvt. Ltd., we are committed to driving digital transformation by delivering 
                    innovative, scalable, and industry-focused technology solutions. Our expertise spans ERP, CRM, 
                    AI-powered automation, e-learning, billing systems, cloud solutions, and cybersecurity—helping businesses 
                    optimize operations, enhance customer engagement, and accelerate growth.
                   </MyCardContent>
                 </MyCard>
              </MyGrid>
              <MyGrid container spacing={2} alignItems="stretch">
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Streamlined Business Operations</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Automate workflows with ERP solutions tailored for enterprises, colleges, and universities.</li>
                        <li>Simplify stock & inventory management with real-time tracking.</li>
                        <li>Enhance billing & payment processing with secure, automated invoicing.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Customer Engagement & Sales Performance</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Intelligent CRM solutions for tracking leads, customer interactions, and sales pipelines.</li>
                        <li>Data-driven insights for upselling and cross-selling opportunities.</li>
                        <li>Automated follow-ups and appointment scheduling, freeing up sales teams for high-value tasks.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Revolutionizing Education with Digital Solutions</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>AI-powered admission systems that cut manual work by 80% and boost enrollments.</li>
                        <li>E-learning platforms for seamless digital education.</li>
                        <li>College & university ERP for efficient administration and student management.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}> Data-Driven Decision Making & Analytics</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Gain real-time insights into customer behavior, market trends, and business performance.</li>
                        <li>AI-powered analytics & predictive modeling for proactive decision-making.</li>
                        <li>Secure and centralized data storage, ensuring seamless collaboration across departments.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>

                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Cybersecurity & Compliance</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Protect critical business data with cutting-edge security solutions.</li>
                        <li>Ensure regulatory compliance with secure document management.</li>
                        <li>Prevent fraud and cyber threats with advanced risk monitoring tools.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Scalable & Future-Ready Solutions</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Cloud-based architecture that grows with your business.</li>
                        <li>Integration with ERP, CRM, marketing, and helpdesk platforms for a seamless experience.</li>
                        <li>AI-driven automation for smarter business processes and customer interactions.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Scalability for Business Growth</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Adapts to growing customer bases and evolving business needs.</li>
                        <li>Integrates with other tools like ERP systems, marketing platforms, or helpdesk software.</li>
                        <li>Supports advanced features like AI-driven nalytics and predictive modeling as the business expands.</li>
                      </ul>
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }} style={{ display: 'flex' }}>
                  <MyCard
                    elevation={0}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    <CardHeader
                      avatar={<MyCheckCircleIcon></MyCheckCircleIcon>}
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Innovative Solutions for a Digital-First Future</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    /> 
                    <MyCardContent>
                      At Adhyayan NextGen Solutions Pvt Ltd, we donot just build software—we create impact. Whether you are a startup, a large enterprise, or an educational institution, we provide customized, high-performance solutions designed to help you stay ahead in the digital era.
                    </MyCardContent>
                  </MyCard>
                </MyGrid>
              </MyGrid>
            </MyCardContent>
          </MyCard>
        </MyBox>
      </div>
      <div className={styles.container}>
        <div className={styles.vertical_center}>
          <p>© Copyright 2025 {COMPANY}, All rights reserved.</p>
          <div className={styles.vertical_center}>
            ||
            <a href="/terms">Terms of use</a>||
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
