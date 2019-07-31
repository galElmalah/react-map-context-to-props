# REACT-WITH-MEMO
## What

Prevent unnecessary renders with ease!

## Why

Managing your app state using context can cause a lot of unnecessary renders.  
Using **react-with-memo** can help prevents most of them!

## How

```javascript 
import * as React from 'react';
import { memoSetup } from 'react-with-memo';

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

const withMemo = memoSetup(Context);

function Id({ id, setId }) {
  return <p data-hook="id" onClick={() => setId(Math.random())}>{id}</p>;
};

const MemoId = withMemo(Id, ({ id, setId }) => ({ id, setId }));

function Name({ name, setName }) {
  return <p data-hook={'name'} onClick={() => setName("sd")}>{name}</p>;
};


const MemoName = withMemo(Name, ({ name, setName }) => ({ name, setName }));



function App() {
  return (
    <Provider>
        // will only render when prop, id, or setId change
        <MemoId prop={0} />
        // will only render when name, or setName change
        <MemoName />
    </Provider>
  );
}

```