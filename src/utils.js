import makeBlockie from 'ethereum-blockies-base64';

export const getAddressDisplay = (address, display) => {
  const displayShort = display !== 'full'
  const addressDisplay = displayShort ? getShortAddress(address) : address
  return addressDisplay.toLowerCase();
}

const getShortAddress = (address) => {
  return address.substr(0,6) + '...' + address.substr(-4);
}

const formatUrl = (url) => {
  if (!url) {
    return undefined;
  }
  return url.includes('http') ?  url : `http://${url}`;
}

const getImgSrc = (profile, address) => {
  if (!profile.image) {
    return makeBlockie(address);
  }
  const hash = profile.image[0].contentUrl["/"];
  return `https://ipfs.infura.io/ipfs/${hash}`;
};

export const copyAddress = (address) => {
  const el = document.createElement('textarea');
  el.value = address
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  const iconId = address.substring(2,6)
  copyToCheck(iconId)
  setTimeout(() => { checkToCopy(iconId) }, 2000);
}

const copyToCheck = (iconId) => {
  document.getElementById(iconId + 'Clone').style = 'display: none;'
  document.getElementById(iconId + 'Check').style = 'display: block;'
}

const checkToCopy = (iconId) => {
  document.getElementById(iconId + 'Check').style = 'display: none;'
  document.getElementById(iconId + 'Clone').style = 'display: block;'
}

export const formatProfileData = (profile, verified, address, addressDisplay) => {
  return {
    imgSrc: getImgSrc(profile, address),
    address: address,
    addressDisplay: addressDisplay,
    github: verified.github ? verified.github.username : undefined,
    twitter: verified.twitter ? verified.twitter.username : undefined,
    emoji: profile.emoji,
    name: profile.name,
    website: profile.website,
    websiteUrl: formatUrl(profile.website)
  };
};

