import { getProfile, getProfiles, getVerifiedAccounts} from '3box/lib/api'
import { baseTemplate, loadingTemplate, emptyProfileTemplate } from './html.js'

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { faCheck, faArrowRight, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faClone } from '@fortawesome/free-regular-svg-icons'

import style from './style.less';
const css = style.toString()

//Utils
const getShortAddress = (address) => {
   return address.substr(0,6) + '...' + address.substr(-4);
}

const copyAddress = (address) => {
  // console.log(address)
  const el = document.createElement('textarea');
  el.value = address
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  const icon = document.getElementById(address.substring(2,6))
  copyToCheck(icon)

  setTimeout(() => { checkToCopy(icon) }, 2000);
}

// For these funcs, mayb swap entire icon element instead
const copyToCheck = (icon) => {
  icon.classList.remove('far')
  icon.classList.remove('fa-clone')
  icon.classList.add('fas')
  icon.classList.add('fa-check')
}

const checkToCopy = (icon) => {
  icon.classList.remove('fas')
  icon.classList.remove('fa-check')
  icon.classList.add('far')
  icon.classList.add('fa-clone')
}

 // Plugin

const injectCSS = () => {
  const sheet = document.createElement('style')
  sheet.type = 'text/css';
  sheet.appendChild(document.createTextNode(css));
  document.body.appendChild(sheet);
}

const initPlugins = () => {
  const buttonArray = document.getElementsByTagName("box:address")
  for (let i = 0; i < buttonArray.length; i++) {
    let { address, display, theme } = buttonArray[i].dataset
    theme = !(theme === 'none')
    const displayShort = !(display === 'full')
    const addressDisplay = displayShort ? getShortAddress(address) : address
    const html = theme ? undefined : buttonArray[i].innerHTML
    buttonArray[i].innerHTML = loadingTemplate({address, addressDisplay: addressDisplay.toLowerCase()}, {html})
  }
}

const loadPluginData = async () => {
  const buttonArray = document.getElementsByTagName("box:address")
  for (let i = 0; i < buttonArray.length; i++) {
    // get addresss, maybe do map instead, add other options here after
    let { address, display, theme } = buttonArray[i].dataset
    theme = !(theme === 'none')
    const displayShort = !(display === 'full')
    const addressDisplay = displayShort ? getShortAddress(address) : address
    try {
      const profile = await getProfile(address)
      const verified = await getVerifiedAccounts(profile)
      const imgSrc = (hash) => `https://ipfs.infura.io/ipfs/${hash}`
      const websiteUrl = profile.website.includes('http') ?  profile.website : `http://${profile.website}`
      const data = {
        imgSrc: profile.image ? imgSrc(profile.image[0].contentUrl['/']) : undefined,
        address: address,
        addressDisplay: addressDisplay.toLowerCase(),
        github: verified.github ? verified.github.username : undefined,
        twitter: verified.twitter ? verified.twitter.username : undefined,
        emoji: profile.emoji,
        name: profile.name,
        website: profile.website,
        websiteUrl: websiteUrl
      }
      const html = theme ? undefined : buttonArray[i].querySelector("#orginal_html_f1kx").innerHTML
      buttonArray[i].innerHTML = baseTemplate(data, {html})
    } catch (e) {
      console.log(e)
      buttonArray[i].innerHTML = emptyProfileTemplate({ address: address, addressDisplay: addressDisplay.toLowerCase()})
    }
  }
}


const injectIcons = () => {
  library.add(faCheck, faArrowRight, faGithub, faTwitter, faGlobeAmericas, faClone);
  dom.watch()
}

const createPlugins = () => {
  injectCSS()
  injectIcons()

  window['boxCopyAddress_f1kx'] = copyAddress

  document.addEventListener("DOMContentLoaded", function(event) {
    initPlugins()
  })

  window.addEventListener('load', async () => {
    loadPluginData()
  })
}


createPlugins()
