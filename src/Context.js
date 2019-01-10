import React from 'react'
import { getPokemon } from './services/pokemon'
import { addLocaleData, IntlProvider } from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_es from 'react-intl/locale-data/es'
import en from './translations/en.json'
import es from './translations/es.json'

addLocaleData([...locale_en, ...locale_es])

const messages = {
  en,
  es
}

export const ContextPokemon = React.createContext()

class Context extends React.Component {
  state = {
    pokemon: [],
    limit: 12,
    filter: '',
    locale: 'es'
  }

  changeLocale = () => {
    this.setState({
      locale: this.state.locale === 'en' ? 'es' : 'en'
    })
  }

  getPokemon = async () => {
    try {
      const { data: pokemon } = await getPokemon()
      await this.setState({ pokemon })
    } catch(error) {
      console.error(error)
    }
  }

  filteredPokemon = () => {
    const filteredPokemon = this.state.filter === ''
      ? this.state.pokemon
      : this.state.pokemon.filter(item => (
          item.name.toLowerCase().includes(this.state.filter.toLowerCase())
      )
    )
    return filteredPokemon.slice(0, this.state.limit)
  }

  showMorePokemon = () => {
    this.setState({limit: this.state.limit + 12}, this.filteredPokemon)
  }

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const {locale} = this.state;
    const context = {
      state: this.state,
      filteredPokemon: this.filteredPokemon,
      getPokemon: this.getPokemon,
      handleChangeFilter: this.handleChangeFilter,
      showMorePokemon: this.showMorePokemon,
      changeLocale: this.changeLocale,
    }

    return (
      <IntlProvider {...{locale, messages:messages[locale]}}>
        <ContextPokemon.Provider value={ context }>
          { this.props.children }
        </ContextPokemon.Provider>
      </IntlProvider>
    )
  }
}

export default Context
