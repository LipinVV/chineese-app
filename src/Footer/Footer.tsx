import './footer.scss'

export const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer-main'>
                <div className='footer-shop'>
                    <h4 className='footer-shop__title'>Wisdom App</h4>
                    <span className='footer-shop__text'>
                        Train your chinese skills with us
                    </span>
                </div>
                <div className='footer-content'>
                    <ul className='footer-contacts'>Contact Us
                        <li className='footer-contacts__mail'><a className='footer-contacts__mail-link'  href = "mailto: vit.lipin@gmail.com">Mail a manager</a></li>
                        <li className='footer-contacts__phone'><a className='footer-contacts__phone-number' href='tel:+79086983282'>79086983282</a></li>
                    </ul>
                    <ul style={{margin: 0, padding: 0}}>
                        <li className='footer-contacts__social-media'>
                            <span className='footer-contacts__social-media-item'><a href='https://facebook.com' className='footer-contacts__social-media-item-fb'></a></span>
                            <span className='footer-contacts__social-media-item'><a href='https://twitter.com' className='footer-contacts__social-media-item-twitter'></a></span>
                            <span className='footer-contacts__social-media-item'><a href='https://linkedin.com' className='footer-contacts__social-media-item-linked'></a></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='footer-underline'>
                <ul className='footer-underline__list'>
                    <li className='footer-underline__item'>2021 © Wisdom App - All right reserved</li>
                    <li className='footer-underline__item'>Term of Service</li>
                    <li className='footer-underline__item'>Privacy Policy</li>
                </ul>
            </div>
        </div>
    )
}