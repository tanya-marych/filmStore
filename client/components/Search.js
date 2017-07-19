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
        let reg = /^[a-zA-Z0-9\s]+$/;
        let res = reg.exec(searchValue);

        let className = e.target.className;
        e.target.className=(res!=null || searchValue==""
            ?className.replace("wrong","")
            :className.indexOf("wrong")>-1 ? className : className+" wrong"
        );

        let error = this.error.className;
        this.error.className = (res!=null || searchValue==""
            ?error.replace("show","")
            :error.indexOf("show")>-1 ? error.replace("hide","show") : error+" show"
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
                <input className="search-input" type='text' onChange={(e)=>this.findFilm(e)} placeholder="Search film here.."/>
                <span ref={error=>this.error = error} className="error">You should use only letters and numbers</span>  
            </div>
        );
    }
}