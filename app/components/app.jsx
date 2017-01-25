import React from 'react';
import ReactDOM from 'react-dom'

function renderItem(item, index) {
  return <li key={index}>{item}</li>;
}

const AppComponent = ({state: {items=[], name}}) => {

  return (
    <div className="demo-video">
      <h3>Hello, My Name is {name}</h3>
      <ul>{items.map(renderItem)}</ul>
    </div>
  );
};


export default AppComponent
