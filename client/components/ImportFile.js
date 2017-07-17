import React from 'react';
let fs = require('fs');

export default class ImportFile extends React.Component{
    constructor(props){
        super(props);
    }

    load(e){
        let file = e.target.files[0];
        console.log(file);
        //ОТПРАВКА НА СЕРВЕР
    }

    render(){
        return (
            <input type="file"name="file" onChange={(e)=>this.load(e)}/>
        );
    }
}