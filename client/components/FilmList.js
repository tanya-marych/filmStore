import React from 'react';

class Film extends React.Component{
    constructor(props){
        super(props);
    }

    toggleInfo(e){
        e.preventDefault();
        let toggle = this.details.className;
        this.details.className = (toggle.indexOf("show")>-1?toggle.replace("show","hide"):toggle.replace("hide","show"));
    }

    deleteFilm(e){
        e.preventDefault();
        this.props.delete(this.props.film._id);
    }

    render(){
        console.log(this.props.film[0])
        return (
            <li className="film">
                <h3 className="film-title" onClick={(e) => this.toggleInfo(e)}>{this.props.film.title}</h3>
                <span className="deleteFilm" onClick={e => this.deleteFilm(e)}>X</span>
                <table className="film-details hide" ref={info => this.details = info}>
                    <tbody>
                        <tr>
                        <td>Release year:</td>
                        <td>{this.props.film.releaseYear}</td>
                    </tr>
                     <tr>
                        <td>Format:</td>
                        <td>{this.props.film.format}</td>
                    </tr>
                     <tr>
                        <td>Stars:</td>
                        <td>{this.props.film.stars}</td>
                    </tr>
                    </tbody>
                </table>
            </li>
        );
    }
}


export default class FilmList extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.actions.loadFilms();
    }

    sortList(e){
        e.preventDefault();
        if(this.props.data.length)
            this.props.actions.sortList(this.props.sorted);
    }

    render(){
        let list = <p>Not found</p>;
        console.log("*",this.props.data)
        if(this.props.data.length)
        list = <ul>
                    {this.props.data.map(item => <Film key={item._id} film={item} delete={this.props.actions.deleteFilm}/>)}
                </ul>;
        return (
            <div className="filmList">
                <a href="" className={(this.props.sorted?"sortList active":"sortList")} onClick={(e)=> this.sortList(e)}>
                    {(this.props.sorted?"Sorted":"Sort")} by title
                </a>
                {list}
            </div> 
        );
    }
}