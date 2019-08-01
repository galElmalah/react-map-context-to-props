# REACT-MAP-CONTEXT-TO-PROPS
## What

Prevent unnecessary renders with ease!

## Why

Managing your app state using context can cause a lot of unnecessary renders.  
Using **react-map-context-to-props** can help prevents most of them!

## How

*Installation*
```npm
npm install react-map-context-to-props -S
```

*Usage Example*

```javascript 
import * as React from 'react';
import { contextMapperSetup } from 'react-map-context-to-props';

const Context = React.createContext({});

const Provider = ({ children }) => {
  const [name, setName] = React.useState("test-name");
  const [id, setId] = React.useState("test-id");

  return (
    <Context.Provider value={{ name, setName, setId, id }}>
      {children}
    </Context.Provider>
  );
};

const mapContextToProps = contextMapperSetup(Context);

function Id({ id, setId }) {
  return <p data-hook="id" onClick={() => setId(Math.random())}>{id}</p>;
};

const ConnectedId = mapContextToProps(Id, ({ id, setId }) => ({ id, setId }));

function Name({ name, setName }) {
  return <p data-hook={'name'} onClick={() => setName("sd")}>{name}</p>;
};


const ConnectedName = mapContextToProps(Name, ({ name, setName }) => ({ name, setName }));



function App() {
  return (
    <Provider>
        // will only render when prop, id, or setId change
        <ConnectedId prop={0} />
        // will only render when name, or setName change
        <ConnectedName />
    </Provider>
  );
}

```