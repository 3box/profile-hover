const style = require('style-loader!./style.less')

const baseTemplate = (data = {}, opts={}) => `
  <div class=${style.boxAddressWrap}>
    ${opts.html ? opts.html : addressBarTemplate(data)}
    ${hoverTemplate(data)}
  </div>
`
const hoverTemplate = (data={}, opts={}) => `
<div class=${style.hoverProfile}>
  <div class=${style.paddingWrap}>
      ${opts.loading ? 'Loading ...' : ''}
      ${data.name ? nameTemplate(data) : ''}
      ${data.twitter ? twitterTemplate(data) : ''}
      ${data.github ? githubTemplate(data) : ''}
      ${data.website ? websiteTemplate(data) : ''}
  </div>
  ${hoverFooterTemplate(data)}
</div>
`

const hoverFooterTemplate = (data={}) => `
  <div class=${style.boxLink}>
    <span> Profile at <a href="${'https://3box.io/' + data.address}" target="_blank">3box.io</a></span>
    <i class="fas fa-arrow-right"></i>
  </div>
`

const addressBarTemplate = (data={}) => `
  <div class=${style.boxAddress}>
    <div class=${style.boxImg}>
      ${data.imgSrc ? `<img src='${data.imgSrc}'  height='32px' width='32px'/>` : ``}
    </div>

    <div class=${style.boxShortAddress}>
        ${data.addressDisplay}
    </div>

    <div class=${style.addressCopy} onClick='boxCopyAddress_f1kx("${data.address}")'>
      <i class="far fa-clone" id=${data.addressDisplay.substring(2,6)}></i>
    </div>
  </div>
`

const nameTemplate = (data = {}) => `
  <div class=${style.profileValueName}>
    <span class=${style.profileText}> ${data.name}  </span>
    ${data.emoji ? '<span>' + data.emoji + '</span>' : ''}
  </div>
`

const websiteTemplate = (data = {}) => `
  <div class=${style.profileValue}>
    <i class="fas fa-globe-americas"></i>
    <span class=${style.profileText}>
      <a href="${data.website}" target="_blank">
        ${data.website}
      </a>
    </span>
  </div>
`
const githubTemplate = (data = {}) => `
  <div class=${style.profileValue}>
      <i class="fab fa-github"></i>
    <span class=${style.profileText}>
      <a href="${'https://www.github.com/' + data.github}" target="_blank">
        ${data.github}
      </a>
    </span>
  </div>
`

const twitterTemplate = (data = {}) => `
  <div class=${style.profileValue}>
    <i class="fab fa-twitter"></i>
    <span class=${style.profileText}>
      <a href="${'https://www.twitter.com/' + data.twitter}" target="_blank">
        ${'@' + data.twitter}
      </a>
    </span>
  </div>
`

const loadingTemplate = (data = {}, opts={}) => `
  <div class=${style.boxAddressWrap}>
    ${opts.html ? `<div id='orginal_html_f1kx' >${opts.html}</div>` : addressBarTemplate(data)}
    ${hoverTemplate(data, {loading: true})}
  </div>
`


// const noThemeTemplate = (data = {}, html ) => `
// <div class=${style.boxAddressWrap}>
//   ${html}
//   ${hoverTemplate(data)}
// </div>
// `
//
// const noThemeLoadingTemplate = (data = {}, html ) => `
// <div class=${style.boxAddressWrap}>
//
//   <div id='orginal_html_f1kx' >
//     ${html}
//   </div>
//
//   ${hoverTemplate(data, {loading: true})}
// </div>
// `

const emptyProfileTemplate = (data) => `
<div class=${style.boxAddressWrap}>

  ${addressBarTemplate(data)}

  <div class=${style.hoverProfile}>
    <div class=${style.boxLink}>
      <span> Create a profile at <a href="${'https://3box.io/'}" target="_blank">3box.io</a></span>
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</div>
`

export { baseTemplate, loadingTemplate, emptyProfileTemplate }
