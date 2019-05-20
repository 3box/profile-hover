import makeBlockie from 'ethereum-blockies-base64';

import { library, dom as faDom } from "@fortawesome/fontawesome-svg-core"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons/faGlobeAmericas"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faClone } from '@fortawesome/free-regular-svg-icons/faClone'

library.add(faCheck, faArrowRight, faGithub, faTwitter, faGlobeAmericas, faClone);
faDom.watch()

export const getAddressDisplay = (address, display) => {
  const displayShort = display !== 'full'
  const addressDisplay = displayShort ? getShortAddress(address) : address
  return addressDisplay.toLowerCase();
}

const getShortAddress = (address) => {
  return address.substr(0,6) + '...' + address.substr(-4);
};

const formatUrl = (url) => {
  if (!url) {
    return undefined;
  }
  return url.includes('http') ?  url : `http://${url}`;
};

const getImgSrc = (profile, address, type) => {
  if (!profile.image && type === 'image') {
    return makeBlockie(address);
  }
  const hash = profile[type][0].contentUrl["/"];
  return `https://ipfs.infura.io/ipfs/${hash}`;
};

export const addToClipboard = (address) => {
  const el = document.createElement('textarea');
  el.value = address
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const formatProfileData = (profile = {}, verified = {}, address, addressDisplay) => {
  try {
    return {
      imgSrc: getImgSrc(profile, address, 'image'),
      address: address,
      addressDisplay: addressDisplay,
      github: verified.github ? verified.github.username : undefined,
      twitter: verified.twitter ? verified.twitter.username : undefined,
      emoji: profile.emoji,
      name: profile.name,
      website: profile.website,
      description: profile.description,
      coverPhoto: getImgSrc(profile, address, 'coverPhoto'),
      websiteUrl: formatUrl(profile.website),
    };
  } catch (e) {
    return {
      address,
      addressDisplay: addressDisplay.toLowerCase(),
      imgSrc: makeBlockie(address)
    }
  }
};