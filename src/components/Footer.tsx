import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Footer.css'
export default function Footer() {
    const handleGitHubClick = () => {
        window.open('https://github.com/DongHY1/FirCDC', '_blank');
    }
    return (
        <div className="footer">
            <div className='text'>made by HaoYu Dong</div>
            <div className="footerIcon" onClick={handleGitHubClick}>
                <GitHubIcon className='text' />
                <span className='text' >Source Code</span>
            </div>
        </div>
    )
}
