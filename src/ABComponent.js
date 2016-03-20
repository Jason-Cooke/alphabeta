import React from 'react';

import { isInCohort } from './Cohort';
import { postExperimentData } from './Experiment';

class ABComponent extends React.Component {
  static displayName = 'ABComponent';

  static propTypes = {
    experimentParams: React.PropTypes.object,
    // ComponentA/B can be either React element or React component.
    ComponentA: React.PropTypes.oneOfType([
      React.PropTypes.element,
      // https://github.com/facebook/react/issues/5143#issuecomment-147473269
      React.PropTypes.oneOfType(
        [React.PropTypes.string, React.PropTypes.func]
      ),
    ]),
    ComponentB: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.oneOfType(
        [React.PropTypes.string, React.PropTypes.func]
      ),
    ]),
    successAction: React.PropTypes.func,
    // cohortStore: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInCohort: false,
    };
  }

  componentWillMount() {
    if (isInCohort(this.props.experimentParams) === true) {
      this.setState({
        isInCohort: true,
      });
    }
  }

  componentDidMount() {
    // record that the AlphaBeta component was loaded
    const variant = this.state.isInCohort ? 'b' : 'a';
    postExperimentData(this.props.experimentParams.id, variant);
  }

  successAction = (...args) => {
    // record that successAction occured
    const variant = this.state.isInCohort ? 'b' : 'a';
    postExperimentData(this.props.experimentParams.id, variant, true);
    // fire the successAction event
    this.props.successAction(...args);
  };

  renderElementOrComponent(elemOrComp) {
    const props = {
      successAction: this.successAction,
    };
    return React.isValidElement(elemOrComp) ?
        React.cloneElement(elemOrComp, props)
        : React.createElement(elemOrComp, props);
  }

  render() {
    const { ComponentA, ComponentB } = this.props;
    if (this.state.isInCohort === true) {
      return this.renderElementOrComponent(ComponentA);
    }
    return this.renderElementOrComponent(ComponentB);
  }
}

export default ABComponent;
