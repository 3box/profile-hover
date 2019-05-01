import { getProfile, getVerifiedAccounts } from "3box/lib/api";
import { baseTemplate, loadingTemplate, emptyProfileTemplate } from "./html.js";
import { getAddressDisplay, formatProfileData, copyAddress } from './utils';
import store from 'store'
import makeBlockie from 'ethereum-blockies-base64';

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight"
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons/faGlobeAmericas"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faClone } from '@fortawesome/free-regular-svg-icons/faClone'

import style from './style.less';
const css = style.toString()

// local store settings, cache for profile requests
const expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)
const ttl = 1000 * 60 * 15
const expireAt = () => new Date().getTime() + ttl

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
    const addressDisplay = getAddressDisplay(address, display)
    const html = theme ? undefined : buttonArray[i].innerHTML
    buttonArray[i].innerHTML = loadingTemplate({address, addressDisplay, imgSrc: makeBlockie(address)}, {html})
  }
}

const loadPluginData = async (buttonArray) => {
  store.removeExpiredKeys()
  for (let i = 0; i < buttonArray.length; i++) {
    // get addresss, maybe do map instead, add other options here after
    let { address, display, theme } = buttonArray[i].dataset
    theme = !(theme === 'none')
    const addressDisplay = getAddressDisplay(address, display)
    // TODO clean up and seperate all this if try etc stuff
    try {
      const cacheProfile = await store.get(address)
      let profile, verified
      if (cacheProfile === '404') {
        buttonArray[i].innerHTML = emptyProfileTemplate({ address, addressDisplay, imgSrc: makeBlockie(address)})
      } else {
        if (!cacheProfile) {
          profile = await getProfile(address)
          verified = await getVerifiedAccounts(profile)
          const setCacheProfile = Object.assign(profile, { verified })
          store.set(address, JSON.stringify(setCacheProfile), expireAt())
        } else {
          profile = JSON.parse(cacheProfile)
          verified = profile.verified
        }
        const data = formatProfileData(profile, verified, address, addressDisplay);
        const html = theme ? undefined : buttonArray[i].querySelector("#orginal_html_f1kx").innerHTML
        buttonArray[i].innerHTML = baseTemplate(data, {html})
      }
    } catch (e) {
      store.set(address, '404', expireAt())
      buttonArray[i].innerHTML = emptyProfileTemplate({ address, addressDisplay, imgSrc: makeBlockie(address)})
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
