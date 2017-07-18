import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmActions from '../actions/filmActions';
import * as filterActions from '../actions/filterActions';

import FilmList from '../components/FilmList';
import NewFilm from '../components/NewFilm';
import ImportFile from '../components/ImportFile';
import Search from '../components/Search';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends React.Component {
    constructor(props){
        super(props);
    }

     componentWillMount(){
        this.props.filmActions.loadFilms();
    }

    searchFilms(){
        let s = this.props.search;
        return this.props.films.filter(item=>{
            return item[s.searchType].toLowerCase().indexOf(s.searchValue.toLowerCase())>-1;
        });
    }

    render() {
        let data = this.searchFilms();
        return (
            <div>
                <header className="header">
                    <h1>Film store</h1>
                </header>
                <Tabs className="container">
                    <TabList>
                        <Tab>Film list</Tab>
                        <Tab>Add film</Tab>
                    </TabList>

                    <TabPanel>
                        <section className="list">
                            <Search filter={this.props.filterActions} search={this.props.search} />
                            <FilmList sorted={this.props.sorted} data={data} actions={this.props.filmActions}/>
                        </section>
                    </TabPanel>
                    <TabPanel>
                        <section className="newFilm">
                            <ImportFile loadData={this.props.filmActions.loadData} />
                            or
                            <NewFilm data={this.props.filmTypes} addFilm={this.props.filmActions.addFilm}/>
                        </section>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps (state) {
  return {
      films: state.film.films,
      sorted: state.film.sorted,
      filmTypes: state.film.filmTypes,
      search:state.searchFilter
  };
}

function mapDispatchToProps (dispatch) {
  return {
      filmActions: bindActionCreators(filmActions,dispatch),
      filterActions: bindActionCreators(filterActions,dispatch)
  };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
