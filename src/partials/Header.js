import React from 'react'
import { Link } from 'react-router-dom'
import logo_pokemon from '../assets/logo_pokemon.svg'
import icon_language from '../assets/icon_language.svg';
import {ContextPokemon} from "../Context"
import { FormattedMessage } from 'react-intl'

const Header = _ =>
  <ContextPokemon.Consumer>
    {context =>
      <header className="header">
        <div className="container">
          <nav className="text-center navbar-dark navbar-container">
            <div />
            <Link className="navbar-brand" to="/">
              <img src={logo_pokemon} width="30" height="30" className="d-inline-block align-top" alt="" />
              <FormattedMessage id='app.title'/>
            </Link>

            <button onClick={context.changeLocale} className="navbar-button-language">
              <span className="mr-2">{context.state.locale === 'en' ? 'es' : 'en'}</span>
              <img src={icon_language} width="30" height="30" className="d-inline-block align-top" alt="" />
            </button>

          </nav>
        </div>
      </header>
    }
  </ContextPokemon.Consumer>

export default Header
