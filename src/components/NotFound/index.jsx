import React from 'react';
import './404.css';

export default () => (
  <div className="wrapper row2 deadpool">
    <div id="container" className="clear">
      <section id="fof" className="clear">
        <div className="hgroup">
          <h1>
            <span>
              <strong>
4
              </strong>
            </span>
            <span>
              <strong>
0
              </strong>
            </span>
            <span>
              <strong>
4
              </strong>
            </span>
          </h1>
          <h2>
            Error !
            {' '}
            <span>
Page Not Found
            </span>
          </h2>
        </div>
        <p>
For Some Reason The Page You Requested Could Not Be Found On Our Server
        </p>
        <p>
          <button
            type="button"
            onClick={() => {
              window.history.go(-1);
              return false;
            }}
          >
            &laquo; Go Back
          </button>
        </p>
      </section>
    </div>
  </div>
);
