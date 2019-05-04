import React from 'react';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";

export default class ProfileHover extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      verified: null
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
      display
    } = this.props;

    const {
      profile,
      verified
    } = this.state;

    console.log({ profile, verified });

    return null;
  }
}

