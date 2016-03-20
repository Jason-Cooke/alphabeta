import React from 'react';

import {isInCohort} from './Cohort';
import {postExperimentData} from './Experiment';

class AlphaBetaComponent extends React.Component {
  // static displayName =

  static propTypes = {
    experimentParams: React.PropTypes.object,
    ComponetA: React.PropTypes.func,
    ComponetB: React.PropTypes.func,
    successAction: React.PropTypes.func,
    passThruProperties: React.PropTypes.object,
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
    let varient;
    if (this.state.isInCohort === true) {
      varient = 'b';
    } else {
      varient = 'a';
    }
    postExperimentData(this.props.experimentParams.id, varient);
  }

  successAction = (event) => {
    // record that successAction occured
    let varient;
    if (this.state.isInCohort === true) {
      varient = 'b';
    } else {
      varient = 'a';
    }
    postExperimentData(this.props.experimentParams.id, varient, true);
    // fire the successAction event
    this.props.successAction(event);
  };

  render() {
    const { ComponetA, ComponetB, passThruProperties } = this.props;

    if (this.state.isInCohort === true) {
      return (
        <ComponetB passThruProperties={passThruProperties}
                   successAction={this.successAction.bind(event)} />
      );
    }
    return (
      <ComponetA passThruProperties={passThruProperties}
                 successAction={this.successAction.bind(event)} />
    );
  }
}

export default AlphaBetaComponent;
