'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import { CardHeader } from '@mui/material';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyApiIcon from '@/app/custom-components/MyApiIcon';
import MyInfoIcon from '@/app/custom-components/MyInfoIcon';

const ClientAboutUs = () => {
  return (
    <>
      <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardHeader
          avatar={<MyInfoIcon></MyInfoIcon>}
          title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>About Us</span>}
          sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
        />
        <MyCardContent>
          <MyGrid container spacing={2} alignItems="stretch">
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Who We Are</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  At BizComrade, we are passionate about helping businesses build lasting relationships with their customers through the
                  power of innovation. As a leading provider of cutting-edge CRM solutions, we empower organizations of all sizes to
                  streamline their customer interactions, enhance productivity, and drive business growth. Our mission is to revolutionize
                  the way businesses manage customer data, making it easier to engage, understand, and retain their clients.
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Mission</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  Our mission is simple: to help businesses succeed by enabling them to manage and nurture customer relationships more
                  effectively. By providing state-of-the-art CRM software, we help our clients gain deeper insights into customer behavior,
                  improve sales processes, and deliver personalized experiences that create lasting loyalty.
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Vision</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  We envision a world where businesses no longer struggle with fragmented customer data and disconnected communication
                  channels. Our vision is to make CRM solutions accessible, adaptable, and intuitive, ensuring businesses can focus on what
                  matters most: creating exceptional customer experiences.
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>What We Do</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  We offer a comprehensive suite of CRM tools designed to meet the unique needs of businesses in every industry. Our
                  platform provides powerful features that include:
                  <ul>
                    <li>
                      <b>Contact Management</b> – Easily store and manage customer information.
                    </li>
                    <li>
                      <b>Sales Automation</b> – Streamline sales processes and increase efficiency.
                    </li>
                    <li>
                      <b>Customer Service Tools</b> – Offer superior customer support through ticketing, live chat, and helpdesk features.
                    </li>
                    <li>
                      <b>Analytics and Reporting</b> – Gain actionable insights into customer behavior and business performance.
                    </li>
                    <li>
                      <b>Marketing Automation</b> – Create and track campaigns that drive engagement and lead generation.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Our Values</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  <ul>
                    <li>
                      <b>Innovation:</b> We’re committed to constantly evolving our CRM solutions to meet the ever-changing needs of
                      businesses.
                    </li>
                    <li>
                      <b>Customer Success:</b> Our clients’ success is our success. We go above and beyond to help businesses achieve their
                      goals.
                    </li>
                    <li>
                      <b>Integrity:</b> We believe in building relationships based on trust and transparency, both with our clients and
                      within our team.
                    </li>
                    <li>
                      <b>Collaboration:</b> Working together with clients and partners to create impactful solutions is at the heart of
                      everything we do.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Why Choose Us?</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  <ul>
                    <li>
                      <b>Customizable Solutions:</b> Our CRM platform is designed to adapt to your specific business needs, ensuring
                      seamless integration and maximum impact.
                    </li>
                    <li>
                      <b>User-Friendly Interface:</b> We prioritize ease of use, making our CRM solution simple to implement and navigate,
                      even for those without a technical background.
                    </li>
                    <li>
                      <b>Exceptional Support:</b> Our customer support team is always ready to assist you, ensuring your experience with our
                      platform is smooth and successful.
                    </li>
                    <li>
                      <b>Proven Success:</b> Trusted by thousands of businesses around the world, we have a proven track record of driving
                      customer success.
                    </li>
                  </ul>
                </MyCardContent>
              </MyCard>
            </MyGrid>
            <MyGrid size={{ xs: 12 }} style={{ display: 'flex' }}>
              <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardHeader
                  avatar={<MyApiIcon></MyApiIcon>}
                  title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Meet the Team</span>}
                  sx={{ height: '50px', backgroundColor: 'rgb(238, 242, 246)' }}
                />
                <MyCardContent>
                  Behind every great solution is a team of passionate professionals. At BizComrade, our team is composed of industry experts
                  in CRM, technology, data analytics, customer service, and business strategy. Together, we work hard to deliver products
                  and services that help you achieve your business objectives.
                </MyCardContent>
              </MyCard>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
      </MyCard>
    </>
  );
};

export default memo(ClientAboutUs, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
