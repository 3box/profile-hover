const { CopyButton } = require('./CopyButton')
const style = require('style-loader!./style.less')

module.exports = ({ dom, React, Fragment }) => {
  const BaseTemplate = React.forwardRef(({ data = {}, opts = {}, checkWindowSize, showHover, isMobile, handleShowHover }, ref) => {
    return (
      <div
        className={`${style.boxAddressWrap} ${!isMobile ? style.isDesktop : ''}`}
        onMouseEnter={() => checkWindowSize(!isMobile)}
        onClick={() => handleShowHover(isMobile)}
      >
        {opts.html ? (
          <Fragment>
            <div>
              {opts.html}
            </div>

            <HoverTemplate
              data={data}
              opts={opts}
              ref={ref}
              showHover={showHover}
            />
          </Fragment>
        ) : <AddressBarTemplate
            data={data}
            opts={opts}
            ref={ref}
            showHover={showHover}
          />}
        {showHover && <div className={style.onClickOutsideMobile} onClick={() => handleShowHover(true)} />}
      </div>
    );
  });

  const HoverTemplate = React.forwardRef(({ data = {}, opts = {}, showHover }, ref) => {
    return (
      <div className={`${style.hoverWrap} ${style[opts.orientation]} ${showHover ? style.showHoverMobile : ''}`}>
        <div className={style.hoverProfile} ref={ref}>
          {opts.loading && <div className={style.loadingText}> Loading ... </div>}

          {data.coverPhoto && <CoverPictureTemplate data={data} opts={opts} />}
          {data.imgSrc && <ProfilePictureTemplate data={data} opts={opts} />}

          {data.name && <NameTemplate data={data} />}
          {data.description && <DescriptionTemplate data={data} />}
          {(data.twitter || data.github || data.website) && (
            <div className={style.profileDetails}>
              {data.twitter && <TwitterTemplate data={data} />}
              {data.github && <GithubTemplate data={data} />}
              {data.website && <WebsiteTemplate data={data} />}
            </div>)}
          <HoverFooterTemplate data={data} />
        </div>
      </div>
    )
  });

  const HoverFooterTemplate = ({ data = {} }) => (
    <div className={style.boxLink}>
      <div className={style.boxLinkText}>
        <span> Profile at <a href={'https://3box.io/' + data.address} target="_blank">3box.io</a></span>
        <i className="fas fa-arrow-right"></i>
      </div>
      <img src="https://i.imgur.com/uRCbJMP.png" className={style.logo} />
    </div>
  )

  const CoverPictureTemplate = ({ data = {}, opts = {} }) => {
    return (
      <React.Fragment>
        {
          (!opts.noCoverImg && !opts.noImg) && (
            <div className={style.coverPicture}>
              {data.coverPhoto ? <img src={data.coverPhoto} className={style.coverPicture_image} />
                : <div className={style.coverPicture_image} />}
            </div>)
        }
      </React.Fragment>
    )
  }

  const AddressBarTemplate = React.forwardRef(({ data = {}, opts = {}, showHover }, ref) => {
    return (
      <div className={`${style.boxAddress} ${data.addressDisplay.length >= 15 ? style.boxAddressFull : ''}`}>
        <div className={style.boxImg}>
          {data.imgSrc && <img src={data.imgSrc} height="32px" width="32px" />}
        </div>

        <div className={style.boxShortAddress}>
          {data.addressDisplay}
        </div>

        <CopyButton address={data.address} />
        <HoverTemplate
          data={data}
          opts={opts}
          ref={ref}
          showHover={showHover}
        />
      </div>
    )
  })

  const ProfilePictureTemplate = ({ data = {}, opts = {} }) => {
    return (
      <React.Fragment>
        {
          (!opts.noProfileImg && !opts.noImg) && (
            <div className={`${style.profileValuePicture} ${opts.noCoverImg ? style.noMargin : ''}`}>
              <img src={data.imgSrc} height="32px" width="32px" />
            </div>
          )
        }
        {(opts.noProfileImg && !opts.noImg) && (<div className={style.noProfileImgSpacer} />)}
      </React.Fragment>)
  }

  const DescriptionTemplate = ({ data = {} }) => (
    <div className={style.profileDescription}>
      <p>{data.description}</p>
    </div>
  )

  const NameTemplate = ({ data = {} }) => (
    <div className={style.profileValueName}>
      <a
        href={'https://3box.io/' + data.address}
        className={style.profileText}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.name}
      </a>
      {data.emoji && <span>{data.emoji}</span>}
    </div>
  )

  const WebsiteTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <p>Website</p>
      <span className={style.profileText}>
        <a href={data.websiteUrl} target="_blank">
          {data.website}
        </a>
      </span>
    </div>
  )

  const GithubTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <p>Github</p>
      <span className={style.profileText}>
        <a href={'https://www.github.com/' + data.github} target="_blank">
          {data.github}
        </a>
      </span>
    </div>
  )

  const TwitterTemplate = ({ data = {} }) => (
    <div className={style.profileValue}>
      <p>Twitter</p>
      <span className={style.profileText}>
        <a href={'https://www.twitter.com/' + data.twitter} target="_blank">
          {'@' + data.twitter}
        </a>
      </span>
    </div>
  )

  const LoadingTemplate = ({ data = {}, opts = {}, showHover }) => {
    return (
      <div className={style.boxAddressWrap}>
        {opts.html ? (
          <Fragment>
            <div id="orginal_html_f1kx">{opts.html}</div>
            <HoverTemplate
              data={data}
              opts={{ loading: true }}
              showHover={showHover}
            />
          </Fragment>
        ) : (
            <AddressBarTemplate
              data={data}
              opts={{ loading: true }}
              showHover={showHover}
            />)}
      </div>
    )
  }

  return {
    BaseTemplate,
    LoadingTemplate,
  }
}

