import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { addToClipboard } from './utils';
const style = require('style-loader!./style.less')

export class CopyButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheck: false
    };
  }

  _onClick(e) {
    e.stopPropagation();
    addToClipboard(this.props.address);
    this.setState({ showCheck: true });
    setTimeout(() => {
      this.setState({ showCheck: false });
    }, 2000);
  }

  render() {
    const icon = this.state.showCheck ? faCheck : null;
    return (
      <div className={style.addressAndCheck}>
        <div className={style.addressWrapper} onClick={(e) => this._onClick(e)} >
          <img src="https://i.imgur.com/zs8M8dg.png" alt="Wallet" />
          <p className={style.address}>
            {`${this.props.address.substr(0, 5)}...${this.props.address.substr(-5)}`}
          </p>
        </div>
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
    );
  }
};

