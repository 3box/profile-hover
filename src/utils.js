export const getShortAddress = (address) => {
   return address.substr(0,6) + '...' + address.substr(-4);
}

export const formatUrl = (url) => {
  if (!url) {
    return undefined;
  }
  return url.includes('http') ?  url : `http://${url}`;
}

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

