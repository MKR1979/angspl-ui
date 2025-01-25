import styles from './page.module.css';
import MyBox from '../custom-components/MyBox';
import MyCard from '../custom-components/MyCard';
import MyCardContent from '../custom-components/MyCardContent';
import MyGrid from '../custom-components/MyGrid';
import { CardHeader } from '@mui/material';
import MyCheckCircleIcon from '../custom-components/MyCheckCircleIcon';
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
          <h1 style={{ fontSize: '50px' }}>Empower Connections, Elevate Success</h1>
        </div>
      </div>
      <div>
        <MyBox>
          <MyCard>
            <MyCardContent>
              <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent>
                   Welcome to Adhyayan NextGen Solutions. At Adhyayan NextGen Solutions, we are at the forefront of delivering cutting-edge technology services tailored to elevate your business to the next level. Our expertise spans across a range of domains, ensuring that we cater to every aspect of your digital transformation journey
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Customer Relationships</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Centralizes customer data, providing a complete view of customer interactions.</li>
                        <li>Improves customer service by ensuring quick and personalized responses to inquiries.</li>
                        <li>Strengthens customer loyalty through targeted communication and engagement.</li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Improved Sales Performance</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Helps track leads, prospects, and opportunities, streamlining the sales pipeline.</li>
                        <li>Offers data-driven insights to identify upselling and cross-selling opportunities.</li>
                        <li>
                          Automates repetitive tasks like follow-ups and appointment scheduling, allowing sales teams to focus on closing
                          deals.
                        </li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Better Data Organization and Accessibility</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Consolidates customer information in one place for easy access by all relevant teams.</li>
                        <li>Provides secure storage of customer data, reducing the risk of data loss.</li>
                        <li>Enables seamless collaboration across departments like marketing, sales, and customer support.</li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Marketing Campaigns</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Allows segmentation of customers based on demographics, preferences, or behavior.</li>
                        <li>Tracks campaign performance metrics to optimize future marketing efforts.</li>
                        <li>Facilitates personalized marketing strategies that resonate with target audiences.</li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Increased Productivity and Efficiency</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Automates routine tasks like data entry, reporting, and lead tracking.</li>
                        <li>Provides real-time analytics and dashboards for informed decision-making.</li>
                        <li>Streamlines workflows and reduces redundancies, saving time and resources.</li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Improved Customer Retention</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Helps identify customer pain points and proactively addresses issues.</li>
                        <li>Tracks customer satisfaction metrics, enabling timely interventions to retain valuable clients.</li>
                        <li>Encourages long-term customer relationships through loyalty programs and consistent communication.</li>
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
                      title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Enhanced Decision-Making</span>}
                      sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                    />
                    <MyCardContent>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li>Provides actionable insights through real-time data analysis and reporting.</li>
                        <li>Helps identify trends, customer behavior patterns, and opportunities for growth.</li>
                        <li>
                          Enables data-driven strategies for sales, marketing, and customer service initiatives. A CRM system is a valuable
                          tool for businesses looking to improve efficiency, customer satisfaction, and overall profitability. Would you
                          like more details about specific CRM solutions or features?
                        </li>
                      </ul>
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
