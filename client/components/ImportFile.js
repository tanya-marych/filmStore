import React from 'react';

export default class ImportFile extends React.Component{
    constructor(props){
        super(props);
    }

    load(e){
        let file = e.target.files[0];
        this.props.loadData(file);

        let x = document.createElement("p");
        x.append("Films were added to the store");
        e.target.form.append(x);
    }

    render(){
        return (
            <form method="post" className="loadFilms" onChange={(e)=>this.load(e)}>
            <input type="file" name="file"/>
            </form>
        );
    }
}