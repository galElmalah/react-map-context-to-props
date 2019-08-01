import * as React from 'react';
import {mount, shallow, configure} from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import {contextMapperSetup} from './index';

configure({adapter: new EnzymeAdapter()});

const Context = React.createContext({});
const Provider = ({children}) => {
  const [name,
    setName] = React.useState("test-name");
  const [id,
    setId] = React.useState("test-id");

  return (
    <Context.Provider
      value={{
      name,
      setName,
      setId,
      id
    }}>
      {children}
    </Context.Provider>
  );
};

const mapContextToProps = contextMapperSetup(Context);
let amountOfRenders = 0;

const Id = mapContextToProps(function Id({id, setId, setCounter}) {
  amountOfRenders++;
  return <p data-hook="id" onClick={() => setId(Math.random())}>{id}</p>;
}, ({id, setId}) => ({id, setId}));

const Name = mapContextToProps(function Name({name, setName}) {
  return <p data-hook={'name'} onClick={() => setName("sd")}>{name}</p>;
}, ({name, setName}) => ({name, setName}));

function App() {
  return (
    <Provider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <Id prop={0}/>
        <Name/>
      </div>
    </Provider>
  );
}

describe('mapContextToProps', () => {
  beforeEach(() => {
    amountOfRenders = 0
  })
  it('should pass the correct props to each component', () => {
    const wrapper = mount(<App/>)
    const IdWrapper = wrapper.find('Id')
    const NameWrapper = wrapper.find('Name')
    expect(NameWrapper.props()).toEqual({
      name: 'test-name',
      setName: expect.any(Function)
    })
    expect(IdWrapper.props()).toEqual({
      id: 'test-id',
      setId: expect.any(Function),
      prop: 0
    })
  })

  it('should render only the relevant components ', () => {
    const wrapper = mount(<App/>)
    const clickOnName = () => wrapper
      .find('[data-hook="name"]')
      .simulate('click')
    const clickOnId = () => wrapper
      .find('[data-hook="id"]')
      .simulate('click')
    clickOnName()
    expect(amountOfRenders).toBe(1)
    clickOnId()
    expect(amountOfRenders).toBe(2);
  })
})
