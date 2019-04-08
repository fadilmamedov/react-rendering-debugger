import React from 'react';

const defaultOptions = {
  groupLabel: 'component update',
  collapseGroup: false,
};

const normalizeOptions = (options) => {
  const groupLabel = options.groupLabel || defaultOptions.groupLabel;
  const collapseGroup = options.collapseGroup || defaultOptions.collapseGroup;

  return {
    groupLabel,
    collapseGroup,
  };
};

export const withRenderingDebugger = (options = defaultOptions) => Component => (
  class RenderingDebugger extends React.Component {
    componentDidUpdate(previousProps, previousState) {
      const { groupLabel, collapseGroup } = normalizeOptions(options);

      if (collapseGroup) {
        console.groupCollapsed(groupLabel);
      } else {
        console.group(groupLabel);
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

      console.groupEnd(groupLabel);
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);
