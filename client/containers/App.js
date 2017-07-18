import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmActions from '../actions/filmActions';
import * as filterActions from '../actions/filterActions';

import FilmList from '../components/FilmList';
import NewFilm from '../components/NewFilm';
import ImportFile from '../components/ImportFile';

class App extends React.Component {
    constructor(props){
        super(props);
    }

    findFilm(e){
        let searchValue=e.target.value;
        let reg = /[a-zA-Z0-9\s]+/;
        let res = reg.exec(searchValue);
        if(res!=null || searchValue==""){
            e.target.className = e.target.className.replace("wrong","");
            this.props.filterActions.changeFilterValue(searchValue);
        }else{
            e.target.className += (e.target.className.indexOf("wrong")>-1?"":" wrong");
        } 

       
        //     let reg = /^\w{2,}\s\w{2,}(\s\w{2,})?$/;
        //     let res = reg.exec(this.searchValue);
        //     if(res!=null){
        //         e.target.className = e.target.className.replace("wrong","");
        //         this.props.filmActions.findFilm(this.searchType,this.searchValue);
        //     }else{
        //         e.target.className += (e.target.className.indexOf("wrong")>-1?"":" wrong");
        //         this.props.filmActions.findFilm(this.searchType,"zzz");
        //     }
        // }
    }

    componentWillMount(){
        this.props.filmActions.loadFilms();
    }

    changeSearchType(e){
        let searchType = e.target.value;
        this.props.filterActions.changeFilterType(searchType);
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
            <div className="container">
                <ImportFile loadData={this.props.filmActions.loadData} />
                <NewFilm data={this.props.filmTypes} addFilm={this.props.filmActions.addFilm}/>

                <label><input type="radio" onChange={(e)=>this.changeSearchType(e)} value="title" checked={this.props.search.searchType=="title"?true:false}/>Title</label>
                <label><input type="radio" onChange={(e)=>this.changeSearchType(e)} value="stars" checked={this.props.search.searchType=="stars"?true:false}/>Star</label>
                <input className="search" type='text' onChange={(e)=>this.findFilm(e)} placeholder="Search film here.."/>
                
                <FilmList sorted={this.props.sorted} data={data} actions={this.props.filmActions}/>
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
