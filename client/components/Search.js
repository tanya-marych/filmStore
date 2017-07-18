import React from 'react';

export default class ImportFile extends React.Component{
    constructor(props){
        super(props);
    }

    changeSearchType(e){
        let searchType = e.target.value;
        this.props.filter.changeFilterType(searchType);
    }

    findFilm(e){
        let searchValue=e.target.value;
        let reg = /[a-zA-Z0-9\s]+/;
        let res = reg.exec(searchValue);

        let className = e.target.className;
        e.target.className=(res!=null || searchValue==""
            ?className.replace("wrong","")
            :className.indexOf("wrong")>-1 ? className : className+" wrong"
        );

        if(res!=null || searchValue==""){
            this.props.filter.changeFilterValue(searchValue);
        }
    }

    render(){
        return (
            <div className="search" >
                <label className="search-radio">
                    <input type="radio" onChange={(e)=>this.changeSearchType(e)} value="title" checked={this.props.search.searchType=="title"?true:false}/>
                    Title
                </label>
                <label className="search-radio">
                    <input type="radio" onChange={(e)=>this.changeSearchType(e)} value="stars" checked={this.props.search.searchType=="stars"?true:false}/>
                    Star
                </label>
                <input className="search-input" type='text' onChange={(e)=>this.findFilm(e)} value={this.props.search.searchValue} placeholder="Search film here.."/>
            </div>
        );
    }
}