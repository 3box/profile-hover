const style = require('style-loader!./style.less')

module.exports = ({ dom, React, Fragment }) => {
  const BaseTemplate = ({ data = {}, opts={} }) => {
    return (
      <div className={style.boxAddressWrap}>
        {opts.html ? (
          <Fragment>
            <div>
              {opts.html}
            </div>
            {opts.empty ? <EmptyHoverTemplate data={data} /> : <HoverTemplate data={data} opts={opts} />}
          </Fragment>
        ) : <AddressBarTemplate data={data} />}
      </div>
    )
  }

  const HoverTemplate = ({ data = {}, opts = {} }) => {
    return (
      <div className={style.hoverProfile}>
        <div className={style.paddingWrap}>
            {opts.loading && <div className={style.loadingText}> Loading ... </div>}
            {data.name && <NameTemplate data={data} />}
            {data.twitter && <TwitterTemplate data={data} />}
            {data.github && <GithubTemplate data={data} />}
            {data.website && <WebsiteTemplate data={data} />}
        </div>
        <HoverFooterTemplate data={data} />
      </div>
    )
  }

  const HoverFooterTemplate = ({ data={} }) => (
    <div className={style.boxLink}>
      <span> Profile at <a href={'https://3box.io/' + data.address} target="_blank">3box.io</a></span>
      <i className="fas fa-arrow-right"></i>
    </div>
  )

  const AddressBarTemplate = ({ data = {}, opts = {} }) => {
    return (
      <div className={`${style.boxAddress} ${data.addressDisplay.length >= 15 ? style.boxAddressFull : ''}`}>
        <div className={style.boxImg}>
          {data.imgSrc && <img src={data.imgSrc}  height="32px" width="32px" />}
        </div>

        <div className={style.boxShortAddress}>
          {data.addressDisplay}
        </div>

        <div className={style.addressCopy} onClick={() => boxCopyAddress_f1kx(data.address)}>
          <i className="far fa-clone" id={data.address.substring(2,6) + 'Clone'}></i>
          <i className="fas fa-check" id={data.address.substring(2,6) + 'Check'} style={{display: 'none'}}></i>
        </div>
        {opts.empty ? <EmptyHoverTemplate data={data} /> : <HoverTemplate data={data} opts={opts} />}
      </div>
    )
  }

  const NameTemplate = ({ data = {} }) => (
    <div className={style.profileValueName}>
      <span className={style.profileText}> {data.name} </span>
      {data.emoji && <span>{data.emoji}</span>}
    </div>
  )

  const WebsiteTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <i className="fas fa-globe-americas"></i>
      <span className={style.profileText}>
        <a href={data.websiteUrl} target="_blank">
          {data.website}
        </a>
      </span>
    </div>
  )

  const GithubTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <i className="fab fa-github"></i>
      <span className={style.profileText}>
        <a href={'https://www.github.com/' + data.github} target="_blank">
          {data.github}
        </a>
      </span>
    </div>
  )

  const TwitterTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <i className="fab fa-twitter"></i>
      <span className={style.profileText}>
        <a href={'https://www.twitter.com/' + data.twitter} target="_blank">
          {'@' + data.twitter}
        </a>
      </span>
    </div>
  )

  const LoadingTemplate = ({ data = {}, opts={} }) => {
    return (
      <div className={style.boxAddressWrap}>
        {opts.html ? (
          <Fragment>
            <div id="orginal_html_f1kx">{opts.html}</div>
            {opts.empty ? <EmptyHoverTemplate data={data} /> : <HoverTemplate data={data} opts={{loading: true}} />}
          </Fragment>
        ) : <AddressBarTemplate data={data} opts={{loading: true}} />}
      </div>
    )
  }


  const EmptyProfileTemplate = ({ data }) => {
    return (
      <div className={style.boxAddressWrap}>
        {<AddressBarTemplate data={data} opts={{empty:true}} />}
      </div>
    )
  }

  const EmptyHoverTemplate = ({ data }) => (
    <div className={style.hoverProfile}>
      <div className={style.boxLinkEmpty}>
        <span> Create a profile at <a href={'https://3box.io/'} target="_blank">3box.io</a></span>
        <i className="fas fa-arrow-right"></i>
      </div>
    </div>
  )

  return { BaseTemplate, LoadingTemplate, EmptyProfileTemplate }
}

