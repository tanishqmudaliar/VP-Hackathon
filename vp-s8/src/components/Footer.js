import React from 'react';
import '../styles/Footer.css';
import {
    IconButton,
    Tooltip,
    Box,
    Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import Phone from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <div className='footer'>
        <div className="ft1">
            <Tooltip title="Facebook - @Vidyalankar.VP  · University">
                <IconButton target="_blank" href="https://www.facebook.com/Vidyalankar.VP/" sx={{ width: 'fit-content', ml: 2, mt: 1.5, color: 'orange' }}>
                    <FacebookIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Instagram - @vp_vidyalankar">
                <IconButton target="_blank" href="https://www.instagram.com/vp_vidyalankar/" sx={{ width: 'fit-content', ml: 2, color: 'orange' }}>
                    <InstagramIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Youtube - Vidyalankar Polytechnic Official">
            <IconButton target="_blank" href="https://www.youtube.com/channel/UCUiyPTvc9VDYNPfmCHMHndw" sx={{ width: 'fit-content', ml: 2, color: 'orange' }}>
                <YouTubeIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn - Vidyalankar Polytechnic - India">
            <IconButton target="_blank" href="https://www.linkedin.com/company/vidyalankar-polytechnic---india" sx={{ width: 'fit-content', ml: 2, color: 'orange' }}>
                <LinkedInIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Twitter - @VidyalankarPoly">
            <IconButton target="_blank" href="https://twitter.com/VidyalankarPoly" sx={{ width: 'fit-content', ml: 2, color: 'orange' }}>
                <TwitterIcon />
            </IconButton>
            </Tooltip>
        </div>
        <div className='ft2'>
            <h1>Vidyalankar Polytechnic</h1>

            Vidyalankar Polytechnic is among top engineering polytechnics of the state offering engineering diploma education to Std 10th students.
            Vidyalankar Polytechnic is approved by AICTE, New Delhi and Government of Maharashtra.
            It is affiliated to Maharashtra State Board of Technical Education (MSBTE), Mumbai.
        </div>
        <div className='ft3'>
            <h1>Contact Us</h1>
            <Box sx={{ display: 'flex', mt: 1 }}>
                <AccountBalanceRoundedIcon sx={{ color: 'orange' }} />
                <Box sx={{ ml: 2, mt: -0.2 }}>
                    <Box sx={{ color: 'lightgray' }}>
                        Vidyalankar Polytechnic
                    </Box>
                    <Box sx={{ color: 'lightgray' }}>
                        Vidyalankar College Marg,
                    </Box>
                    <Box sx={{ color: 'lightgray' }}>
                        Wadala (East),
                    </Box>
                    <Box sx={{ color: 'lightgray' }}>
                        Mumbai - 400037
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Phone sx={{ color: 'orange' }} />
                <Box sx={{ ml: 2, mt: -0.2, color: 'lightgray' }}>
                    +91 22241 61126
                </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
                <EmailIcon sx={{ color: 'orange' }} />
                <Box sx={{ ml: 2, mt: -0.2, color: 'lightgray' }}>
                    principal@vpt.edu.in
                </Box>
            </Box>
        </div>
        <div className='ft4'>
            <h1>Website</h1>
            <Link href="/home" underline='hover' sx={{ height: '20px', mt: -3.5, color: 'orange' }}>Home</Link>
            <Link href="/events" underline='hover' sx={{ height: '20px', mt: -3.5, color: 'orange' }}>Events</Link>
            <Link href="/images" underline='hover' sx={{ height: '20px', mt: -3.5, color: 'orange' }}>Images</Link>
            <Link href="/videos" underline='hover' sx={{ height: '20px', mt: -3.5, color: 'orange' }}>Videos</Link>
            <Link href="/contactus" underline='hover' sx={{ height: '20px', mt: -3.5, color: 'orange' }}>Contact Us</Link>
        </div>
    </div>
  )
}

export default Footer