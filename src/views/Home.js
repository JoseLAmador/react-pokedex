import React from 'react'
import PokedexCard from '../components/PokedexCard'
import { ContextPokemon } from '../Context'
import { FormattedMessage } from 'react-intl'

class Home extends React.Component {
  static contextType = ContextPokemon

  componentDidMount() {
    this.context.getPokemon()
  }

  printPokemon = pokemon => (
    this.context.filteredPokemon().map((item, index) => (
      <div
        className="col-md-4 col-lg-3 mb-3"
        key={index}
        onClick={ () => this.goToDetails(item) }
        >
        <PokedexCard pokemon={item} />
      </div>
    ))
  )

  goToDetails = pokemon => {
    this.props.history.push(`/detail/${pokemon.slug}`, { pokemon })
  }

  printButton = () => (
   this.context.state.filter === ''
    ? <button className="btn btn-primary"
        onClick={ this.context.showMorePokemon }
      >
       <FormattedMessage id="load.pokemon" />
      </button>
    : null
  )

  render() {
    return (
      <React.Fragment>
        <section className="pokedex-filters mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-6 ml-auto mr-auto">
                <div className="text-center">
                  <label><FormattedMessage id="title.search" /></label>
                  <FormattedMessage id="placeholder.search">
                    {msj => (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={msj}
                        onChange={ this.context.handleChangeFilter }
                        value={ this.context.state.filter }
                      />
                    )}
                  </FormattedMessage>
                  <small id="emailHelp" className="form-text text-muted">
                    <FormattedMessage id="note.search" />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <main className="main-section mb-5">
          <div className="container">
            <section className="podexex-items">
              <div className="row">
                { this.printPokemon() }
              </div>
              <div className="row">
                <div className="col-md-12 text-center mt-3">
                  { this.printButton() }
                </div>
              </div>
            </section>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default Home
