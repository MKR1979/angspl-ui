import { jsPDF } from 'jspdf';

export const generatePDF = async ({
  title,
  content,
  logoUrl = '/logo.png',
  company = {
    email: 'info@adhyayan.online',
    website: 'adhyayan.online',
    contact: '+91-9522933330',
    contactUsPage: 'adhyayan.online/contact-us'
  }
}: {
  title: string;
  content: string;
  logoUrl?: string;
  company?: {
    email: string;
    website: string;
    contact: string;
    contactUsPage: string;
  };
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const headerHeight = 20;
  const footerHeight = 15;

  const loadImageAsBase64 = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // const companyLogoBase64 = await loadImageAsBase64(logoUrl);
  const companyLogoBase64 = await loadImageAsBase64(logoUrl);
  if (!companyLogoBase64.startsWith('data:image')) {
    console.warn('Logo not found or invalid format, skipping logo');
  } else {
    doc.addImage(companyLogoBase64, 'PNG', 4, 2, 35, 15);
  }

  const drawHeaderFooter = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.addImage(companyLogoBase64, 'PNG', 4, 2, 35, 15);
    doc.link(4, 2, 35, 15, { url: `https://${company.website}` });

    const emailWidth = doc.getTextWidth(company.email);
    const websiteWidth = doc.getTextWidth(company.website);
    const contactWidth = doc.getTextWidth(company.contact);
    const separatorWidth = doc.getTextWidth(' | ');
    const totalFooterWidth = emailWidth + separatorWidth + websiteWidth + separatorWidth + contactWidth;
    const startX = (pageWidth - totalFooterWidth) / 2 + 35;
    const footerY = pageHeight - 10;

    doc.setTextColor(0, 0, 255);
    doc.textWithLink(company.email, startX, footerY, { url: `https://${company.contactUsPage}` });
    doc.text(' | ', startX + emailWidth, footerY);
    doc.textWithLink(company.website, startX + emailWidth + separatorWidth, footerY, { url: `https://${company.website}` });
    doc.text(' | ', startX + emailWidth + separatorWidth + websiteWidth, footerY);
    doc.textWithLink(company.contact, startX + emailWidth + separatorWidth + websiteWidth + separatorWidth, footerY, {
      url: `https://${company.contactUsPage}`
    });
    doc.setTextColor(0, 0, 0);
  };

  drawHeaderFooter();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  const titleWidth = doc.getTextWidth(title);
  const xCenter = (pageWidth - titleWidth) / 2;
  const yTitle = headerHeight;
  doc.text(title, xCenter, yTitle);

  const underlineY = yTitle + 2;
  doc.setLineWidth(0.5);
  doc.line(xCenter, underlineY, xCenter + titleWidth, underlineY);

  doc.setFont('courier', 'normal');
  doc.setFontSize(12);

  const marginLeft = 10;
  const marginRight = 10;
  const maxLineWidth = pageWidth - marginLeft - marginRight;

  const contentLines = content.split('\n');
  let y = underlineY + 10;
  const lineSpacing = 5;

  contentLines.forEach((line) => {
    const splittedLines: string[] = doc.splitTextToSize(line, maxLineWidth);

    splittedLines.forEach((splitLine) => {
      if (y + lineSpacing > pageHeight - footerHeight) {
        doc.addPage();
        drawHeaderFooter();
        y = headerHeight + 10;
        doc.setFont('courier', 'normal');
        doc.setFontSize(12);
      }
      doc.text(splitLine, marginLeft, y);
      y += lineSpacing;
    });
  });
  doc.save(`${title.replace(/\s+/g, '_')}_adhyayan.online.pdf`);
};








// import { jsPDF } from 'jspdf';

// export const generatePDF = async ({
//   title,
//   content,
//   logoUrl = '/logo.png',
//   company = {
//     email: 'info@adhyayan.online',
//     website: 'adhyayan.online',
//     contact: '+91-9522933330',
//     contactUsPage: 'adhyayan.online/contact-us'
//   }
// }: {
//   title: string;
//   content: string;
//   logoUrl?: string;
//   company?: {
//     email: string;
//     website: string;
//     contact: string;
//     contactUsPage: string;
//   };
// }) => {
//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.width;
//   const pageHeight = doc.internal.pageSize.height;
//   const headerHeight = 20;
//   const footerHeight = 15;

//   const loadImageAsBase64 = async (url: string) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   const companyLogoBase64 = await loadImageAsBase64(logoUrl);

//   const drawHeaderFooter = () => {
//     doc.setFont('helvetica', 'normal');
//     doc.setFontSize(10);
//     doc.addImage(companyLogoBase64, 'PNG', 4, 2, 35, 15);
//     doc.link(4, 2, 35, 15, { url: `https://${company.website}` });

//     const emailWidth = doc.getTextWidth(company.email);
//     const websiteWidth = doc.getTextWidth(company.website);
//     const contactWidth = doc.getTextWidth(company.contact);
//     const separatorWidth = doc.getTextWidth(' | ');
//     const totalFooterWidth = emailWidth + separatorWidth + websiteWidth + separatorWidth + contactWidth;
//     const startX = (pageWidth - totalFooterWidth) / 2 + 35;
//     const footerY = pageHeight - 10;

//     doc.setTextColor(0, 0, 255);
//     doc.textWithLink(company.email, startX, footerY, { url: `https://${company.contactUsPage}` });
//     doc.text(' | ', startX + emailWidth, footerY);
//     doc.textWithLink(company.website, startX + emailWidth + separatorWidth, footerY, { url: `https://${company.website}` });
//     doc.text(' | ', startX + emailWidth + separatorWidth + websiteWidth, footerY);
//     doc.textWithLink(company.contact, startX + emailWidth + separatorWidth + websiteWidth + separatorWidth, footerY, {
//       url: `https://${company.contactUsPage}`
//     });
//     doc.setTextColor(0, 0, 0);
//   };

//   drawHeaderFooter();

//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(15);
//   const titleWidth = doc.getTextWidth(title);
//   const xCenter = (pageWidth - titleWidth) / 2;
//   const yTitle = headerHeight;
//   doc.text(title, xCenter, yTitle);

//   const underlineY = yTitle + 2;
//   doc.setLineWidth(0.5);
//   doc.line(xCenter, underlineY, xCenter + titleWidth, underlineY);

//   doc.setFont('courier', 'normal');
//   doc.setFontSize(12);
//   const contentLines = content.split('\n');
//   let y = underlineY + 10;
//   const lineSpacing = 5;

//   contentLines.forEach((line) => {
//     if (y + lineSpacing > pageHeight - footerHeight) {
//       doc.addPage();
//       drawHeaderFooter();
//       y = headerHeight + 10;
//       doc.setFont('courier', 'normal');
//       doc.setFontSize(12);
//     }
//     doc.text(line, 10, y);
//     y += lineSpacing;
//   });

//   doc.save(`${title.replace(/\s+/g, '_')}_adhyayan.online.pdf`);
// };