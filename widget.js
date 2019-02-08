import { getProfile, getProfiles, getVerifiedAccounts} from '3box/lib/api'
import baseTemplate from './html.js'

// now fetch data, get all data in one request, add the images to each, add the hover items to each
//TODO change to getProfiles Request
window.addEventListener('load', async () => {
    const buttonArray = document.getElementsByTagName("box:address")
    for (let i = 0; i < buttonArray.length; i++) {
      // get addresss, maybe do map instead, add other options here after
      let { address } = buttonArray[i].dataset
      const profile = await getProfile(address)
      const verified = await getVerifiedAccounts(profile)
      console.log(verified)
      console.log(profile)
      const imgSrc = (hash) => `https://ipfs.infura.io/ipfs/${hash}`
      const shortAddress = getShortAddress(address).toLowerCase()
      const data = {
        imgSrc: imgSrc(profile.image[0].contentUrl['/']),
        address: address,
        shortAddress: shortAddress,
        github: verified.github ? verified.github.username : undefined,
        twitter: verified.twitter ? verified.twitter.username : undefined,
        emoji: profile.emoji,
        name: profile.name,
        website: profile.website
      }
      buttonArray[i].innerHTML = baseTemplate(data)
    }
  }
)



const getShortAddress = (address) => {
   return address.substr(0,6) + '...' + address.substr(-4);
}


// This will load all ccs, but for now write css in css colum
//  This inject all html and styling of empty state

const loadPlugins = () => {
    document.addEventListener("DOMContentLoaded", function(event) {
      const buttonArray = document.getElementsByTagName("box:address")
      for (let i = 0; i < buttonArray.length; i++) {
        let { address } = buttonArray[i].dataset
        const shortAddress = getShortAddress(address).toLowerCase()
        buttonArray[i].innerHTML = baseTemplate({shortAddress: shortAddress})
      }
    })
}

loadPlugins()
