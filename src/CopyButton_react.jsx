import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faClone } from '@fortawesome/free-regular-svg-icons/faClone'
import { addToClipboard } from './utils';
const style = require('style-loader!./style.less')

export class CopyButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheck: false
    };
  }

  _onClick() {
    addToClipboard(this.props.address);
    this.setState({ showCheck: true });
    setTimeout(() => {
      this.setState({ showCheck: false });
    }, 2000);
  }

  render() {
    const icon = this.state.showCheck ? faCheck : faClone;
    return (
      <div className={style.addressCopy} onClick={() => this._onClick()}>
        <FontAwesomeIcon icon={icon} />
      </div>
    );
  }
};

