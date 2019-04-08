import React from 'react';

export const withRenderingDebugger = ({ collapse = false } = {}) => Component => (
  class Test extends React.Component {
    componentDidUpdate(previousProps, previousState) {
      const label = 'component did update';

      if (collapse) {
        console.groupCollapsed(label);
      } else {
        console.group(label);
      }

      const currentProps = this.props || {};
      const currentState = this.state || {};

      Object.entries(currentProps).forEach(([name, value]) => {
        const previousValue = previousProps[name];
        if (previousValue !== value) {
          console.log(`%cProperty - ${name}`, 'color: red');
          console.log('Previous value');
          console.dir(previousValue);

          console.log('Current value');
          console.dir(value);
        }
      });

      Object.entries(currentState).forEach(([name, value]) => {
        const previousValue = previousState[name];

        if (previousValue !== value) {
          console.log(`%State - ${name}`, 'color: red');
          console.log('Previous value');
          console.dir(previousValue);

          console.log('Current value');
          console.dir(value);
        }
      });

      console.groupEnd(label);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);
