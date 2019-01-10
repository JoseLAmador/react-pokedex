import React from 'react'
import { FormattedMessage } from 'react-intl'

const Footer = _ =>
  <footer className="footer">
    <div className="container">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <span className="nav-link"><FormattedMessage id="app.footer" /></span>
        </li>
      </ul>
    </div>
  </footer>

export default Footer
