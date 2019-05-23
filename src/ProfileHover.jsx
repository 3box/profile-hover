import React, { Fragment } from 'react';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";
import { getAddressDisplay, formatProfileData, formatUrl } from './utils';
const { BaseTemplate, LoadingTemplate } = require('./html')({ React, Fragment });

export default class ProfileHover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: undefined,
      verified: undefined,
      adjustOrientation: undefined,
      isMobile: false,
      showHover: false
    };

    this.selector = React.createRef();
    this.checkWindowSize = this.checkWindowSize.bind(this);
    this.isMobileDevice = this.isMobileDevice.bind(this);
    this.handleShowHover = this.handleShowHover.bind(this);
  }

  componentDidCatch(error, info) {
    console.error({ error, info });
  }

  componentDidMount() {
    this.isMobileDevice();
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

  checkWindowSize(shouldRun) {
    const { hasUpdated } = this.state;
    if (!hasUpdated && shouldRun) {
      const { adjustOrientation } = this.state;
      const height = window.innerHeight;
      const rect = this.selector.current.getBoundingClientRect();
      const elHeight = rect.height;
      const elY = rect.y;

      let updateOrientation = adjustOrientation;

      if (elHeight + elY > height) {
        updateOrientation = 'top';
      } else if (elY < 0) {
        updateOrientation = 'bottom';
      }

      this.setState({ adjustOrientation: updateOrientation, hasUpdated: true });
    }
  };

  isMobileDevice() {
    let isMobile = false;
    if ((typeof window.orientation !== "undefined")
      || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
      isMobile = true;
    };
    this.setState({ isMobile });
  };

  handleShowHover(isMobile) {
    const { showHover } = this.state;
    if (isMobile) this.setState({ showHover: !showHover }, () => this.checkWindowSize(true));
  }

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
      url
    } = this.props;

    const {
      profile,
      verified,
      adjustOrientation,
      isMobile,
      showHover
    } = this.state;

    if (address == null) {
      return null;
    }

    const opts = {
      html: noTheme ? children : undefined,
      noImg,
      noProfileImg,
      noCoverImg,
      url: formatUrl(url),
      orientation: adjustOrientation || orientation || 'right',
    };

    const addressDisplay = getAddressDisplay(address, fullDisplay ? 'full' : undefined)
    const data = formatProfileData(profile, verified, address, addressDisplay);
    if (profile == null) {
      return <LoadingTemplate
        data={data}
        opts={opts}
        isMobile={isMobile}
        showHover={showHover}
        handleShowHover={this.handleShowHover}
      />;
    }
    if (profile.status === 'error') {
      return <BaseTemplate
        data={data}
        opts={opts}
        id={address}
        isMobile={isMobile}
        showHover={showHover}
        checkWindowSize={this.checkWindowSize}
        ref={this.selector}
        handleShowHover={this.handleShowHover}
      />;
    }

    return <BaseTemplate
      data={data}
      opts={opts}
      id={address}
      checkWindowSize={this.checkWindowSize}
      isMobile={isMobile}
      showHover={showHover}
      ref={this.selector}
      handleShowHover={this.handleShowHover}
    />;
  }
}