import * as React from 'react';

function makeDecorateFactory<AllInjectables, InjectablesType>(INJECTABLES: InjectablesType) {
  type Filter<T, U> = T extends U ? T : never;
  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
  type AllInjectablesKeys = keyof AllInjectables;
  type PropsWithoutInjectables<P> = Omit<P, AllInjectablesKeys>;
  type TupleToUnion<T> = T extends string[] ? T[number] : never;
  type TupleInjectables<T> = Pick<AllInjectables, Filter<TupleToUnion<T>, AllInjectablesKeys>>;
  type DecorateType = keyof InjectablesType;
  interface InjectedComponent {
    __injectables: DecorateType[];
  }

  const tuple = <T extends DecorateType[]>(...args: T) => args;

  /**
   * Example:
   *
   * class FooComponentBase extends Decorated.ReactComponent<{foo:string}>('relay', 'history', 'store', 'observer') {};
   * const FooComponent = Decorated.GetComponent(FooComponentBase);
   * Then in use: <FooComponent foo="bar" /> (notice relay, history, and store do not need to be provided)
   *
   * param {DecorateType[]} injectables in decorator-order
   * returns an InjectedComponent as <Props & Injectables>
   */
  function ReactComponent<P = {}>(...injectables: DecorateType[]) {
    interface InjectedComponent {
      __injectables: DecorateType[];
    }
    class InjectedComponent extends React.Component {
      static __injectables = injectables.reverse();
    }

    const tup = tuple(...injectables);
    type T = typeof tup;

    return (InjectedComponent as any) as InjectedComponent & React.ComponentClass<P & TupleInjectables<T>>;
  }

  /**
   * Runs the injectables on the component and returns the component typed without injectable props.
   *
   * param {Component} Component that will be injected with previously instantiated injections
   * returns {Component} with all HOCs run with a ComponentType removing the injectables
   */
  function GetComponent<P>(Component: InjectedComponent & React.ComponentType<P>): React.ComponentType<PropsWithoutInjectables<P>> {
    const { __injectables } = Component;
    for (const injectable of __injectables) {
      const fn = INJECTABLES[injectable];
      if (fn && typeof fn === 'function') {
        let nameBefore = Component.displayName;
        Component = fn(Component);
        let nameAfter = Component.displayName;
        if (nameBefore === nameAfter) {
          Component.displayName = `${injectable as string}(${Component.displayName})`;
        }
      }
    }
    Component.displayName = `Decorated.GetComponent(${Component.displayName})`;
    return (Component as any) as React.ComponentType<PropsWithoutInjectables<P>>;
  }

  return { GetComponent, ReactComponent };
}

export default function decorateFactory<InjectablesType>(INJECTABLES: InjectablesType) {
  return function<AllInjectables>() {
    return makeDecorateFactory<AllInjectables, InjectablesType>(INJECTABLES);
  };
}
