import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Row from './Row';
import Datum from './Datum';
import Title from './Title';
import Header from './Header';
import naturalSort from './naturalSort';

/*
 * The user of the table is responsible for passing in a unique key for each
 * object in props.data
 *
 *
 * TODO:
 * - footer
 * - row selection
 * - enable column sorting
 * - column name hover
 * - long header titles
 * - inline text editing
 * - inline menus
 * - alternate headers
 */

const UpwardArrow = props => <svg {...props} viewBox="0 0 24 24">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
</svg>;


class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: '',
      descending: true,
      sortedData: this.props.data,
    };
  }

  sortBy(key) {
    let shouldDescend;
    if (key === this.state.sortedBy) {
      // flip descending or ascending
      if (this.state.descending) {
        shouldDescend = false;
      } else {
        shouldDescend = true;
      }
    } else {
      // default, new stort to descending
      shouldDescend = true;
    }
    // init the sorter
    const sorter = naturalSort({ desc: shouldDescend });

    // sort by key!
    const sorted = this.state.sortedData.sort(
      (a, b) => sorter(a[key], b[key])
    );
    this.setState({ descending: shouldDescend, sortedData: sorted, sortedBy: key });
  }


  render() {
    return (
      <div className={`smc-table-wrapper ${this.props.className}`}>
        {this.props.header && <Header>{this.props.header}</Header>}
        <table className="smc-table-table">
          <thead className="smc-table-head">
            <Row header>
              {this.props.checkbox && <this.props.checkbox />}
              {this.props.fields.map(({ label, numerical, key, sortable }, i) => (
                <Title
                  key={label}
                  column={key}
                  numerical={numerical}
                  first={i === 0}
                  last={i === this.props.fields.length - 1}
                >
                  <div className='sortButtonContainer'>
                    {sortable && <UpwardArrow
                      className={this.state.sortedBy === key && this.state.descending ? 'sortButton rotate' : 'sortButton'}
                      onClick={() => this.sortBy(key)}
                    />}
                    {label}
                  </div>
                </Title>
              ))}
            </Row>
          </thead>
          <tbody>
            {this.state.sortedData.map(datum => (
              <Row key={`row_${datum.key}`}>
                {this.props.checkbox &&
                  <this.props.checkbox onClick={() => this.props.checkbox.callback(datum.key)} />
                }
                {this.props.fields.map(({ key, numerical }, i) => (
                  <Datum
                    key={`{${datum.key}_${key}}`}
                    column={key}
                    numerical={numerical}
                    first={i === 0}
                    last={i === this.props.fields.length - 1}
                  >
                    {datum[key]}
                  </Datum>
                ))}
              </Row>
            ))}
          </tbody>
        </table>
      </div >
    );
  }
}

export default styled(Table) `
  ${props => (props.fullWidth ? 'width: 100%' : '')};
    overflow: hidden;
    background-color: #fff;
    border-radius: 3px;
    border-spacing: 0;
    border: 0px;
  
    > .smc-table-header {
      padding: 0 14px;
    }

    > .smc-table-table {
      border-collapse: collapse;

      .sortButtonContainer {
        height: 18px;
        display: inline-flex;
        
        > .sortButton {
        height: 18px;
        width: 18px;
          
          float: right;
          cursor: pointer;
          border-radius: 8px;
          display: block;
          margin-right: 16px;
          fill: rgba(0, 0, 0, .54);
          transform-origin: center;
          transition: 0.3s;
        }

        > .sortButton:hover {
          background-color: rgba(0, 0, 0, .04);
        }

        > .rotate {
          transform: rotate(180deg);
        }
      }

      tr {
        border: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, .54);
      }
      ${props => (props.fullWidth ? 'width: 100%' : 'width: auto')};
      border-spacing: 0;
    }
`;
