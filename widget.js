import { getProfile, getProfiles, getVerifiedAccounts} from '3box/lib/api'
import { baseTemplate, loadingTemplate, emptyProfileTemplate } from './html.js'

import style from './style.less';
const css = style.toString()

const sheet = document.createElement('style')
sheet.type = 'text/css';
sheet.appendChild(document.createTextNode(css));
document.body.appendChild(sheet);

// now fetch data, get all data in one request, add the images to each, add the hover items to each
//TODO change to getProfiles Request
window.addEventListener('load', async () => {
    const buttonArray = document.getElementsByTagName("box:address")
    for (let i = 0; i < buttonArray.length; i++) {
      // get addresss, maybe do map instead, add other options here after
      let { address, display, theme } = buttonArray[i].dataset
      theme = !(theme === 'none')
      const displayShort = !(display === 'full')
      const addressDisplay = displayShort ? getShortAddress(address) : address
      const profile = await getProfile(address)
      if (profile.status === 'error') {
          buttonArray[i].innerHTML = emptyProfileTemplate({ address: address, addressDisplay: addressDisplay.toLowerCase()})
      } else {
        const verified = await getVerifiedAccounts(profile)
        console.log(verified)
        console.log(profile)
        const imgSrc = (hash) => `https://ipfs.infura.io/ipfs/${hash}`
        const data = {
          imgSrc: imgSrc(profile.image[0].contentUrl['/']),
          address: address,
          addressDisplay: addressDisplay.toLowerCase(),
          github: verified.github ? verified.github.username : undefined,
          twitter: verified.twitter ? verified.twitter.username : undefined,
          emoji: profile.emoji,
          name: profile.name,
          website: profile.website
        }
        const html = theme ? undefined : buttonArray[i].querySelector("#orginal_html_f1kx").innerHTML
        buttonArray[i].innerHTML = baseTemplate(data, {html})
      }
    }
  }
)


const getShortAddress = (address) => {
   return address.substr(0,6) + '...' + address.substr(-4);
}


window['boxCopyAddress_f1kx'] = (address) => {
  const el = document.createElement('textarea');
  el.value = address
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  const icon = document.getElementById(address.substring(2,6))
  icon.classList.remove('far')
  icon.classList.remove('fa-clone')
  icon.classList.add('fas')
  icon.classList.add('fa-check')

  setTimeout(function(){
    icon.classList.remove('fas')
    icon.classList.remove('fa-check')
    icon.classList.add('far')
    icon.classList.add('fa-clone')
  }, 2000);
}

// This will load all ccs, but for now write css in css colum
//  This inject all html and styling of empty state

const loadPlugins = () => {
    document.addEventListener("DOMContentLoaded", function(event) {
      const buttonArray = document.getElementsByTagName("box:address")
      for (let i = 0; i < buttonArray.length; i++) {
        let { address, display, theme } = buttonArray[i].dataset
        theme = !(theme === 'none')
        const displayShort = !(display === 'full')
        const addressDisplay = displayShort ? getShortAddress(address) : address
        const html = theme ? undefined : buttonArray[i].innerHTML
        buttonArray[i].innerHTML = loadingTemplate({address, addressDisplay: addressDisplay.toLowerCase()}, {html})
      }
    })
}

loadPlugins()
