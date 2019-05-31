import React, { Fragment } from 'react';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";
import { getAddressDisplay, formatProfileData, formatUrl, checkIsMobile } from './utils';
const { BaseTemplate, LoadingTemplate } = require('./html')({ React, Fragment });

export default class ProfileHover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: undefined,
      verified: undefined,
      adjustOrientation: undefined,
      isMobile: false,
      showHover: false,
      hasWeb3Mobile: false,
      copySuccessful: ''
    };
    this.selector = React.createRef();
    this.checkWindowSize = this.checkWindowSize.bind(this);
    this.handleShowHover = this.handleShowHover.bind(this);
    this.handleCopySuccessful = this.handleCopySuccessful.bind(this);
    this.checkHasWeb3Mobile = this.checkHasWeb3Mobile.bind(this);
  }

  componentDidCatch(error, info) {
    console.error({ error, info });
  }

  componentDidMount() {
    this.setState({ isMobile: checkIsMobile() });
    this.checkHasWeb3Mobile();
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
      this.setState({ profile, verified, hasUpdated: false });
    } catch (error) {
      console.error('3box profile fetch failed', error);
    }
  }

  checkWindowSize(shouldRun) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  checkHasWeb3Mobile() {
    const hasWeb3Mobile = checkIsMobile() && (
      typeof window.web3 !== 'undefined' || typeof window.ethereum !== 'undefined');
    this.setState({ hasWeb3Mobile });
  };

  handleShowHover(isMobile) {
    const { showHover, hasUpdated } = this.state;
    if (isMobile) this.setState({ showHover: !showHover },
      () => { if (!hasUpdated) this.checkWindowSize(true) });
  }

  handleCopySuccessful(field) {
    this.setState({ copySuccessful: field },
      () => setTimeout(() => {
        this.setState({ copySuccessful: '' });
      }, 2000)
    );
  }

  render() {
    const {
      address,
      fullDisplay,
      children,
      noTheme,
      noImgs,
      noProfileImg,
      noCoverImg,
      orientation,
      url,
      showName,
      tileStyle
    } = this.props;

    const {
      profile,
      verified,
      adjustOrientation,
      isMobile,
      showHover,
      hasWeb3Mobile,
      copySuccessful
    } = this.state;

    if (address == null) {
      return null;
    }

    const opts = {
      html: noTheme ? children : undefined,
      noImgs,
      noProfileImg,
      noCoverImg,
      showName,
      tileStyle,
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
        ref={this.selector}
        checkWindowSize={this.checkWindowSize}
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
      hasWeb3Mobile={hasWeb3Mobile}
      isMobile={isMobile}
      showHover={showHover}
      ref={this.selector}
      handleShowHover={this.handleShowHover}
      checkWindowSize={this.checkWindowSize}
      handleCopySuccessful={this.handleCopySuccessful}
      copySuccessful={copySuccessful}
    />;
  }
}
