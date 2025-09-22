import Image from 'next/image';
// import '@/app/styles/frontend/page.module.css';
// import '@/app/styles/frontend/about_global.css';
import './footer.css';
import Link from 'next/link';
const Footer = () => {
    return (

        <footer className="footer-bottom side-space-mlr">
            <div className="row footer-row-1">
                <div className='col-6 p-0 footer-logo-col'>
                    <Image src={'/images/Footer/footer-logo.svg'} alt='logo' width={296} height={75}></Image>
                </div>
                <div className='col-6 p-0 d-flex justify-content-end align-items-center footer-logo-col'>
                    <Link href={'#'}><Image src={'/images/Footer/facebook.svg'} alt='logo' width={30} height={30}></Image></Link>
                    <Link href={'#'}><Image src={'/images/Footer/twiiter.svg'} alt='logo' width={30} height={30}></Image></Link>
                    <Link href={'#'}><Image src={'/images/Footer/linkedin.svg'} alt='logo' width={30} height={30}></Image></Link>
                    <Link href={'#'}><Image src={'/images/Footer/insta.svg'} alt='logo' width={30} height={30}></Image></Link>
                    <Link href={'#'}><Image src={'/images/Footer/youtube.svg'} alt='logo' width={30} height={30}></Image></Link>
                </div>
            </div>
            <div className="row footer-row-2 p-0 m-0">
                <div className='col-12 col-md-3 p-0 column-menu-1'>
                    <h5 className='mb'>About IIS</h5>
                    <ul>
                        <li><Link href={'#'}>Board Of Directors</Link></li>
                        <li><Link href={'#'}>Why IIS</Link></li>
                        <li><Link href={'#'}>Who We Are</Link></li>
                        <li><Link href={'#'}>Our Journey</Link></li>
                        <li><Link href={'#'}>Organizational Structure</Link></li>
                        <li><Link href={'#'}>Accreditation</Link></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3 p-0 column-menu-2'>
                    <h5 className='mb'>Our Values</h5>
                    <ul>
                        <li><Link href={'#'}>Vision and Mission</Link></li>
                        <li><Link href={'#'}>Community Engagement</Link></li>
                        <li><Link href={'#'}>Strategic Goals</Link></li>
                        <li><Link href={'#'}>Partnerships</Link></li>
                        <li><Link href={'#'}>Future Initiatives</Link></li>
                        <li><Link href={'#'}>Accreditation</Link></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3 p-0 column-menu-3'>
                    <h5 className='mb'>Other Links</h5>
                    <ul>
                        <li><Link href={'#'}>Contact Us</Link></li>
                        <li><Link href={'#'}>Success Stories</Link></li>
                        <li><Link href={'#'}>Events</Link></li>
                        <li><Link href={'#'}>Career Opportunities</Link></li>
                        <li><Link href={'#'}>Student Portal</Link></li>
                        <li><Link href={'#'}>Teacher Portal</Link></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3 p-0 column-menu-4'>
                    <h5 className='mb'>Branches</h5>
                    <div className='address m-25'>
                        <h6>Airport Road - طريق المطار</h6>
                        <Link href={'#'}><Image src={'/images/Footer/location.svg'} alt='location' width={18} height={18}></Image>P.O.Box 499 Marj Al-Hamam 11732 Jordan</Link>
                        <Link href={'#'}><Image src={'/images/Footer/phone.svg'} alt='phone' width={18} height={18}></Image>+962-6-5733377</Link>
                    </div>
                    <div className='address m-25'>
                        <h6>Khalda - خلدا</h6>
                        <Link href={'#'}><Image src={'/images/Footer/location.svg'} alt='location' width={18} height={18}></Image>P.O.Box 499 Marj Al-Hamam 11732 Jordan</Link>
                        <Link href={'#'}><Image src={'/images/Footer/phone.svg'} alt='phone' width={18} height={18}></Image>+962-6-5733377</Link>
                    </div>
                    <hr className='m-25'></hr>
                    <Link href={'#'}  className='m-25'><Image src={'/images/Footer/email.svg'} alt='location' width={18} height={18}></Image>a.bayyat@iis.edu.jo</Link>
                       
                </div>
            </div>
            <div className="row footer-row-3 m-0 p-0">
                <div className='col-6 p-0 footer-logo-col'>
                    <Link href={'#'}>©International Independent School, 2025 All rights reserved. Powered by <strong>Hats-Off</strong></Link>
                </div>
                <div className='col-6 p-0 d-flex justify-content-end align-items-center footer-logo-col'>
                    <Link href={'#'}>Privacy policy </Link>| <Link href={'#'}>Terms of use</Link>
                </div>
            </div>
        </footer>

    )
};
export default Footer;