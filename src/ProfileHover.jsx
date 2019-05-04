import React from 'react';
import { getProfile, getVerifiedAccounts } from "3box/lib/api";

export default class ProfileHover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      verified: null
    };
  }

  async componentDidMount() {
    const {
      address,
    } = this.props;

    const profile = await getProfile(address);
    const verified = await getVerifiedAccounts(profile);
    this.setState({ profile, verified });
  }

  render() {
    const {
      address,
      display,
      theme
    } = this.props;

    const {
      profile,
      verified,
    } = this.state;

    console.log({ profile, verified });

    return null;
  }
}

