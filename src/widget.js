import { getProfile, getProfiles, getVerifiedAccounts} from '3box/lib/api'
import { baseTemplate, loadingTemplate, emptyProfileTemplate } from './html.js'
import store from 'store'

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { faCheck, faArrowRight, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faClone } from '@fortawesome/free-regular-svg-icons'

import style from './style.less';
const css = style.toString()


// local store settings, cache for profile requests
const expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)
const ttl = 1000 * 60 * 15
const expireAt = () => new Date().getTime() + ttl

//Utils
const getShortAddress = (address) => {
   return address.substr(0,6) + '...' + address.substr(-4);
}

const copyAddress = (address) => {
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

 // Plugin
const injectCSS = () => {
  const sheet = document.createElement('style')
  sheet.type = 'text/css';
  sheet.appendChild(document.createTextNode(css));
  document.body.appendChild(sheet);
}

const initPlugins = (buttonArray) => {
  for (let i = 0; i < buttonArray.length; i++) {
    let { address, display, theme } = buttonArray[i].dataset
    theme = !(theme === 'none')
    const displayShort = !(display === 'full')
    const addressDisplay = displayShort ? getShortAddress(address) : address
    const html = theme ? undefined : buttonArray[i].innerHTML
    buttonArray[i].innerHTML = loadingTemplate({address, addressDisplay: addressDisplay.toLowerCase()}, {html})
  }
}

const loadPluginData = async (buttonArray) => {
  store.removeExpiredKeys()
  for (let i = 0; i < buttonArray.length; i++) {
    // get addresss, maybe do map instead, add other options here after
    let { address, display, theme } = buttonArray[i].dataset
    theme = !(theme === 'none')
    const displayShort = !(display === 'full')
    const addressDisplay = displayShort ? getShortAddress(address) : address
    try {
      const cacheProfile = await store.get(address)
      let profile, verified
      if (!cacheProfile) {
        profile = await getProfile(address)
        verified = await getVerifiedAccounts(profile)
        const setCacheProfile = Object.assign(profile, { verified })
        store.set(address, JSON.stringify(setCacheProfile), expireAt())
      } else {
        profile = JSON.parse(cacheProfile)
        verified = profile.verified
      }
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
    const buttonArray = document.getElementsByTagName("threebox-address")
    initPlugins(buttonArray)
    window.addEventListener('load', async () => {
      loadPluginData(buttonArray)
    })
  })
}

const pluginAddedListener = () => {
  const target = document.body
  const config = {
    childList: true,
  }
  function subscriber(mutations) {
    const node = mutations.addedNodes ? mutations.addedNodes[0] : null
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        const newElements = Array.from(mutation.addedNodes)
        const addressTags = newElements.filter(el => el.tagName === 'THREEBOX-ADDDRESS')
        initPlugins(addressTags)
        loadPluginData(addressTags)
      }
    })
  }

  const observer = new MutationObserver(subscriber);

  observer.observe(target, config);
}

pluginAddedListener()

createPlugins()
