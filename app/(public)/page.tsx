import styles from './page.module.css';
import MyBox from '../custom-components/MyBox';
import MyCard from '../custom-components/MyCard';
import MyCardContent from '../custom-components/MyCardContent';
import MyGrid from '../custom-components/MyGrid';
import { CardHeader } from '@mui/material';
import MyCheckCircleIcon from '../custom-components/MyCheckCircleIcon';
import MyApiIcon from '../custom-components/MyApiIcon';
export default function Home() {
  return (
    <div style={{ width: '100%', padding: '0px' }}>
      <div
        style={{
          backgroundImage: 'url(/hero2.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
          width: '100%',
          height: '400px'
          //borderRadius: '18px'
        }}
      >
        <div className={styles.hero_text}>
          <h1 style={{ fontSize: '50px' }}>Next-Gen Technology for Next-Level Growth</h1>
        </div>
      </div>
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
                      At Adhyayan NextGen Solutions Pvt Ltd, we don’t just build software—we create impact. Whether you're a startup, a large enterprise, or an educational institution, we provide customized, high-performance solutions designed to help you stay ahead in the digital era.
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
          <p>© Copyright 2025 Adhyayan NextGen Solution Pvt. Ltd., All rights reserved.</p>
        </div>
      </div>
      {/* <main className={styles.main}>
        <Button variant="contained">Hello world</Button>
      </main> */}
      {/* <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
