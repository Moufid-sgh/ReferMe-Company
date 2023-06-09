import './globals.css'
import { Roboto } from 'next/font/google';
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'ReferMe',
  description: 'Unlock new career opportunities and propel your professional growth with our all-inclusive platform, where you can freely exchange and receive valuable referrals."',
  keywords: 'Job referrals, Referral platform, Job opportunities, Career networking, Boost your career' 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
