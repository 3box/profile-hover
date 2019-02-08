
const baseTemplate = (data = {}) => `
  <div class='box-address'>
    <div class='box-img'>
      <img src='${data.imgSrc}'  height='32px' width='32px'/>
    </div>

    <div class='box-short-address'>
        ${data.shortAddress}
    </div>

    <div class='hover-profile'>

        <div class='profile-value-name'>
          <span class='profile-text'> ${data.name}  </span>
          <span> ${data.emoji} </span>
        </div>

        <div class='profile-value'>
          <i class="fab fa-twitter"></i>
          <span class='profile-text'>
            <a href="${'https://www.twitter.com/' + data.twitter}" target="_blank">
              ${'@' + data.twitter}
            </a>
          </span>
        </div>

        <div class='profile-value'>
            <i class="fab fa-github"></i>
          <span class='profile-text'>
            <a href="${'https://www.github.com/' + data.github}" target="_blank">
              ${data.github}
            </a>
          </span>
        </div>

        <div class='profile-value'>
          <i class="fas fa-globe-americas"></i>
          <span class='profile-text'>
            <a href="${data.website}" target="_blank">
              ${data.website}
            </a>
          </span>
        </div>
        <div class='box-link'>
          <span> Profile at <a href="${'https://3box.io/' + data.address}" target="_blank">3box.io</a></span>
          <i class="fas fa-arrow-right"></i>
        </div>
    </div>
  </div>
`

const html = (val) => val

export default baseTemplate
