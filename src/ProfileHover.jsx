import React, { Fragment } from 'react'
import makeBlockie from 'ethereum-blockies-base64';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";
import { getAddressDisplay, formatProfileData } from './utils';
const { BaseTemplate, LoadingTemplate, EmptyProfileTemplate } = require('./html')({ React, Fragment });

export default class ProfileHover extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      profile: undefined,
      verified: undefined
    };
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

  render() {
    const {
      address,
      fullDisplay,
      noTheme,
      children
    } = this.props;

    const {
      profile,
      verified
    } = this.state;

    const opts = {
      html: noTheme ? children : undefined
    };

    const addressDisplay = getAddressDisplay(address, fullDisplay ? 'full' : undefined)
    const data = formatProfileData(profile, verified, address, addressDisplay);
    if (profile == null) {
      return <LoadingTemplate data={data} opts={opts} />;
    }
    if (profile == '404') {
      return <EmptyProfileTemplate data={data} opts={opts} />;
    }

    return <BaseTemplate data={data} opts={opts} />;
  }
}

