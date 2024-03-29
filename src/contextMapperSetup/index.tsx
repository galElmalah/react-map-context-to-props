import * as React from 'react';
import {Context, ComponentType} from 'react';

type MapStringToAny = {
  [key : string]: any
}

/**
*
* @param context init a custom memo that memoize parts of your context
*/
export function contextMapperSetup(context : Context < any >) {
  /**
  * @param mapStateToProps a mapper function that take the context and returns a derived state,
  *   this state will be the factor to determine if the component will rendered
  *  @example
  *   using mapStateToProps - (state: YourInterface) => ({someDerivedState: 1})
  *   your component will now re render only when someDerivedState ref changes
  */
  return function mapContextToProps(Component : ComponentType < any >, mapStateToProps : (state : any) => MapStringToAny) {
    return function MapContextToProps(props : MapStringToAny) {
      const contextState = mapStateToProps(React.useContext(context));
      (mapContextToProps as any).displayName = `MapContextToProps(${Component.displayName || 'Component'})`
      return React.useMemo(() => {
        return <Component {...contextState} {...props}/>;
      }, Object.values({
        ...contextState,
        ...props
      }));
    }
  }
};

export function mapContextToProps(Component : ComponentType < any >) {
  return function mapContextToProps(props : MapStringToAny) {
    (mapContextToProps as any).displayName = `mapContextToProps(${Component.displayName || 'Component'})`
    return React.useMemo(() => {
      return <Component {...props}/>;
    }, Object.values(props));
  }
}