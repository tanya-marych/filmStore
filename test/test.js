import * as filterActions from '../client/actions/filterActions.js';
import * as filmActions from '../client/actions/filmActions.js';
import filmReducer from '../client/reducers/film.js';
import searhReducer from '../client/reducers/searchFilter.js';
import ImportFile from '../client/components/ImportFile.js';
import React from 'react';

let chai = require('chai');
import { shallow, render } from 'enzyme';
let expect = chai.expect;

chai.should();

describe('actions', function() {
  it('filter action CHANGE_FILTER_TYPE',()=>{
        filterActions.changeFilterType("stars").should.deep.equal(
            {
                type:'CHANGE_FILTER_TYPE',
                payload:"stars"
            }
        );
  });

  it('filter action CHANGE_FILTER_VALUE',()=>{
        filterActions.changeFilterValue("search").should.deep.equal(
            {
                type:'CHANGE_FILTER_VALUE',
                payload:"search"
            }
        );
  });

  it('film action SORT_LIST',()=>{
        filmActions.sortList("true").should.deep.equal(
            {
                type:'SORT_LIST',
                payload:"true"
            }
        );
  })
});

describe('film reducer', function() {
  it('LOAD_FILMS',()=>{
        let state = {
            sorted:false,
            filmTypes:["VHS","DVD","Blu-Ray"],
            films:[]
        };
        let action ={
            type:"LOAD_FILMS",
            payload:["hello","world","!"]
        };
        let res={
            sorted: false,
            filmTypes:["VHS","DVD","Blu-Ray"],
            films:["hello","world","!"]
        };
        filmReducer(state,action).should.deep.equal(res);
  });

  it('SORT_LIST',()=>{
        let state = {
            sorted:false,
            filmTypes:["VHS","DVD","Blu-Ray"],
            films:["c","b","a"]
        };
        let action ={
            type:"SORT_LIST"
        };
        let res={
            sorted: true,
            filmTypes:["VHS","DVD","Blu-Ray"],
            films:["c","b","a"]
        };
        filmReducer(state,action).should.deep.equal(res);
  });
});

describe('search reducer', function() {
  it('CHANGE_FILTER_TYPE',()=>{
        let state = {
            searchType:"title",
            searchValue:""
        };
        let action ={
            type:"CHANGE_FILTER_TYPE",
            payload:"stars"
        };
        let res={
                searchType:"stars",
                searchValue:""
        };
        searhReducer(state,action).should.deep.equal(res);
  });

  it('CHANGE_FILTER_VALUE',()=>{
        let state = {
            searchType:"title",
            searchValue:""
        };
        let action = {
            type:"CHANGE_FILTER_VALUE",
            payload:"2011"
        };
        let res = {
            searchType:"title",
            searchValue:"2011"
        };
        searhReducer(state,action).should.deep.equal(res);
  });

  it('SEARCH_FILM',()=>{
        let state = {
            searchType:"title",
            searchValue:""
        };
        let action = {
            type:"SEARCH_FILM",
            payload:{
                searchType:"stars",
                state:"johnny depp"
            }
        };
        let res = {
            searchType:"stars",
            searchValue:"johnny depp"
        };
        searhReducer(state,action).should.deep.equal(res);
  });

});

describe('component ImportFile', function() {
  it('render form',()=>{
        const wrapper = shallow(<ImportFile />);
		expect(wrapper.find('form')).to.have.length(1);
  });

  it('renders input inside form', () => {
    const wrapper = render(<ImportFile />);
    expect(wrapper.find('form > input')).to.have.length(1);
  });
});



