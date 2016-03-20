import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './main.css';

import { ABComponent } from '../../../src/index';
import ButtonA from './components/ButtonA';
import ButtonB from './components/ButtonB';

class Page extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ABComponent
              experimentParams={{
                id: 'button-experiment',
                testCohortSize: 0.8,
              }}
              ComponentA={ButtonA}
              ComponentB={ButtonB} />
        </div>

        <div>
          <ABComponent
              experimentParams={{
                id: 'button-experiment-2',
                testCohortSize: 0.4,
              }}
              ComponentA={<ButtonA text="Alternate Text A" />}
              ComponentB={<ButtonB text="Alternate Text B" />} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
