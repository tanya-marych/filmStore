import React from 'react';

class SelectYear extends React.Component{
    render(){
        let select=[];
        let from = this.props.from;
        let to = this.props.to;
        for(let i=from;i>=to;i--){
            select.push(<option key={i} value={i}>{i}</option>);
        }
        return (
            <select onChange={e => this.props.change(e)}>
                {select}
            </select>
        );
    }
}

class SelectFilmType extends React.Component{
    render(){
        return (
            <select onChange={e => this.props.change(e)}>
                {this.props.data.map((item,index)=><option key={index} value={item}>{item}</option>)}
            </select>
        );
    }
}

export default class NewFilm extends React.Component{
    constructor(props){
        super(props);
        this.selYear = new Date().getFullYear();
        this.film={
            id:"",
            title:"",
            stars:"",
            format:this.props.data[0],
            releaseYear:this.selYear

        };
    }
    
    checkStars(e){
        let actors =e.target.value.trim();
        let reg = /^\w{2,}\s\w{2,}(\s\w{2,})?(,\s?\w{2,}\s\w{2,}(\s\w{2,})?)*$/;
        let res = reg.exec(actors);
        if(res!=null){
            e.target.className = e.target.className.replace("wrong","");
            this.film.stars = actors;
        }else{
            this.film.stars="";
            e.target.className = (e.target.className.indexOf("wrong")>-1?e.target.className:"wrong");
        }
        this.checkSubmit();
    }

    checkTitle(e){
        let title =e.target.value.trim();
        let reg = /[a-zA-Z0-9\s]{3,}/;
        let res = reg.exec(title);
        if(title=="" || title.length<3){
            e.target.className = (e.target.className.indexOf("wrong")>-1?e.target.className:"wrong");
            this.film.title="";
        }else{
            this.film.title = title;
            e.target.className = e.target.className.replace("wrong","");
        } 
        this.checkSubmit();
    }

    checkSubmit(){
        this.submit.disabled = this.film.title=="" || this.film.stars=="";
    }

    checkYear(e){
        this.film.releaseYear = e.target.value;
    }

    checkFormat(e){
        this.film.format = e.target.value;
    }

    addFilm(e){
        e.preventDefault();
        this.film.id = Date.now();
        console.log(this.film);
        this.props.addFilm(this.film);
        e.target.reset();
    }

    render(){
        return (
            <form className="addFilm" onSubmit={(e) => this.addFilm(e)}>
                <input type="text" placeholder="Film title" className="wrong" onChange={e=>this.checkTitle(e)}/>
                <SelectYear from={this.selYear} to="1900" change={this.checkYear.bind(this)}/>
                <SelectFilmType data={this.props.data} change={this.checkFormat.bind(this)}/>
                <textarea className="wrong" onChange={e=>this.checkStars(e)} placeholder="Film stars"/>
                <input type="submit" disabled ref={submit=> this.submit=submit} value="Send"/>
            </form>
        );
    }
}