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

        let className = e.target.className;
        e.target.className = (res!=null?className.replace("wrong",""):className.indexOf("wrong")>-1?className:"wrong");
        this.film.stars = (res!=null?actors:"");

        let error = this.starsError.className;
        this.starsError.className = (res==null
            ?error.indexOf("show")>-1 ? error.replace("hide","show") : error+" show"
            :error.replace("show","")
        );

        this.checkSubmit();
    }

    checkTitle(e){
        let title =e.target.value.trim();
        let reg = /^[a-zA-Z0-9\s]{3,}$/;
        let res = reg.exec(title);
        console.log("res",res)
        
        let className = e.target.className;
        e.target.className = (title=="" || res==null
            ?className.indexOf("wrong")>-1 ? className : className+" wrong"
            :className.replace("wrong","")
        );

        let error = this.titleError.className;
        this.titleError.className = (title=="" || res==null
            ?error.indexOf("show")>-1 ? error.replace("hide","show") : error+" show"
            :error.replace("show","")
        );
        
        
        this.film.title=(title=="" || title.length<3?"":title);
        
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
        this.props.addFilm(this.film);

        e.target.reset();
        e.target.title.className +=" wrong";
        e.target.textarea.className +=" wrong";
        this.film={
            id:"",
            title:"",
            stars:"",
            format:this.props.data[0],
            releaseYear:this.selYear
        };
        let x = document.createElement("p");
        x.append("Film was added to the store");
        e.target.append(x);
    }

    render(){
        return (
            <form className="addFilm" onSubmit={(e) => this.addFilm(e)}>
                <input name="title" type="text" placeholder="Film title" className="wrong" onChange={e=>this.checkTitle(e)}/>
                <span ref={error=>this.titleError = error} className="error">You should use only letters and numbers.<br/> Title consist of 3 and more letters</span>
                <SelectYear from={this.selYear} to="1900" change={this.checkYear.bind(this)}/>
                <SelectFilmType data={this.props.data} change={this.checkFormat.bind(this)}/>
                <textarea name="textarea" className="wrong" onChange={e=>this.checkStars(e)} placeholder="Film stars"/>
                <span ref={error=>this.starsError = error} className="error">
                    You should use only letters, numbers,space and ","<br/>
                    Example: Johnny Depp, Angelina Jolie
                    </span>
                <input type="submit" disabled ref={submit=> this.submit=submit} value="Send"/>
            </form>
        );
    }
}