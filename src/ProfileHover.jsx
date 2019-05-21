import React, { Fragment } from 'react';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";
import { getAddressDisplay, formatProfileData } from './utils';
const { BaseTemplate, LoadingTemplate, EmptyProfileTemplate } = require('./html')({ React, Fragment });

export default class ProfileHover extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      profile: undefined,
      verified: undefined,
      adjustOrientation: null
    };
    this.selector = React.createRef();
    this.checkWindowSize = this.checkWindowSize.bind(this);
  }

  componentDidCatch(error, info) {
    console.error({ error, info });
  }

  componentDidMount() {
    this._fetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      this._fetchProfile();
    }
  }

  async _fetchProfile() {
    try {
      const profile = await getProfile(this.props.address);
      const verified = await getVerifiedAccounts(profile);
      this.setState({ profile, verified });
    } catch (error) {
      console.error('3box profile fetch failed', error);
    }
  }

  checkWindowSize() {
    const { hasUpdated } = this.state;
    // const { orientation } = this.props;

    if (!hasUpdated) {
      const { adjustOrientation } = this.state;
      const height = window.innerHeight;
      // const width = window.innerWidth;
      const rect = this.selector.current.getBoundingClientRect();
      const elHeight = rect.height;
      const elY = rect.y;

      // const elWidth = rect.width;
      // const elX = rect.x;

      let updateOrientation = adjustOrientation;

      // if (elWidth + elX > width) {
      //   if(orientation === ) updateOrientation = 'left';
      // } else if (elX < 0) {
      //   updateOrientation = 'right';
      // }

      if (elHeight + elY > height) {
        updateOrientation = 'top';
      } else if (elY < 0) {
        updateOrientation = 'bottom';
      }

      this.setState({ adjustOrientation: updateOrientation, hasUpdated: true });
    }
  };

  render() {
    const {
      address,
      fullDisplay,
      noTheme,
      children,
      noImg,
      noProfileImg,
      noCoverImg,
      orientation,
    } = this.props;

    const {
      profile,
      verified,
      adjustOrientation
    } = this.state;

    if (address == null) {
      return null;
    }

    const opts = {
      html: noTheme ? children : undefined,
      noImg,
      noProfileImg,
      noCoverImg,
      orientation: adjustOrientation || orientation || 'right',
    };

    const addressDisplay = getAddressDisplay(address, fullDisplay ? 'full' : undefined)
    const data = formatProfileData(profile, verified, address, addressDisplay);
    if (profile == null) {
      return <LoadingTemplate data={data} opts={opts} />;
    }
    if (profile.status === 'error') {
      return <BaseTemplate
        data={data}
        opts={opts}
        id={address}
        checkWindowSize={this.checkWindowSize}
        ref={this.selector}
      />;
    }

    return <BaseTemplate
      data={data}
      opts={opts}
      id={address}
      checkWindowSize={this.checkWindowSize}
      ref={this.selector}
    />;
  }
}