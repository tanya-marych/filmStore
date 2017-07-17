import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmActions from '../actions/filmActions';

import FilmList from '../components/FilmList';
import NewFilm from '../components/NewFilm';
import ImportFile from '../components/ImportFile';

class App extends React.Component {
    constructor(props){
        super(props);
        this.searchType = "title";
        this.searchValue = "";
    }

    findFilm(e){
        this.searchValue=e.target.value;
        // if(this.searchType=="title"){
            this.props.filmActions.findFilm(this.searchType,this.searchValue);
        // }
        // else{
        //     if(this.searchValue==""){
        //         e.target.className = e.target.className.replace("wrong","");
        //         this.props.filmActions.findFilm(this.searchType,this.searchValue);
        //         return;
        //     }  
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

    changeSearchType(e){
        this.searchType = e.target.value;
        this.props.filmActions.findFilm(this.searchType,this.searchValue);
    }

    render() {
        return (
            <div className="container">
                <ImportFile loadData={this.props.filmActions.loadData} />
                <NewFilm data={this.props.filmTypes} addFilm={this.props.filmActions.addFilm}/>
                <label><input type="radio" onClick={(e)=>this.changeSearchType(e)} name="searchType" value="title" defaultChecked/>Title</label>
                <label><input type="radio" onClick={(e)=>this.changeSearchType(e)} name="searchType" value="stars"/>Star</label>
                <input className="search" type='text' onChange={(e)=>this.findFilm(e)} placeholder="Search film here.."/>
                <FilmList sorted={this.props.sorted} data={this.props.films} actions={this.props.filmActions}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
  return {
      films: state.films,
      sorted: state.sorted,
      filmTypes: state.filmTypes
  };
}

function mapDispatchToProps (dispatch) {
  return {
      filmActions: bindActionCreators(filmActions,dispatch)
  };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
