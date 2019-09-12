const { CopyButton } = require('./CopyButton');
const { addToClipBoardLinks } = require('./utils');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faCheck } = require('@fortawesome/free-solid-svg-icons/faCheck');
const style = require('style-loader!./style.less');

module.exports = ({ dom, React, Fragment }) => {
  let BaseTemplate =
    ({
      data = {},
      opts = {},
      checkWindowSize,
      showHover,
      isMobile,
      handleShowHover,
      hasWeb3Mobile,
      handleCopySuccessful,
      copySuccessful
    },
      ref) => {
      return (
        <div
          className={`${style.boxAddressWrap} ${!isMobile ? style.isDesktop : ''}`}
          onMouseEnter={() => checkWindowSize(!isMobile)}
        >
          {opts.html ? (
            <Fragment>
              {opts.html}

              <HoverTemplate
                data={data}
                opts={opts}
                ref={ref}
                showHover={showHover}
                hasWeb3Mobile={hasWeb3Mobile}
                handleCopySuccessful={handleCopySuccessful}
                copySuccessful={copySuccessful}
              />
            </Fragment>
          ) : (
              <AddressBarTemplate
                data={data}
                opts={opts}
                ref={ref}
                showHover={showHover}
                isMobile={isMobile}
                handleShowHover={handleShowHover}
                handleCopySuccessful={handleCopySuccessful}
                hasWeb3Mobile={hasWeb3Mobile}
                copySuccessful={copySuccessful}
              />
            )}

          {showHover && <div className={style.onClickOutsideMobile} onClick={() => handleShowHover(true)} />}
        </div>
      );
    }
  if (React) BaseTemplate = React.forwardRef(BaseTemplate)

  let HoverTemplate =
    ({
      data = {},
      opts = {},
      showHover,
      hasWeb3Mobile,
      handleCopySuccessful,
      copySuccessful,
      loading
    },
      ref) => {
      return (
        <div className={`${style.hoverWrap} ${style[opts.orientation || 'right']} ${showHover ? style.showHoverMobile : ''}`}>
          <div className={style.hoverProfile} ref={ref}>
            {loading && <div className={style.loadingText}> Loading ... </div>}

            {data.coverPhoto && <CoverPictureTemplate data={data} opts={opts} />}
            {data.imgSrc && <ProfilePictureTemplate data={data} opts={opts} />}

            {data.name && <NameTemplate
              data={data}
              hasWeb3Mobile={hasWeb3Mobile}
              handleCopySuccessful={handleCopySuccessful}
              copySuccessful={copySuccessful}
            />}

            {data.description && <DescriptionTemplate data={data} />}

            {(data.twitter || data.github || data.website) && (
              <div className={style.profileDetails}>
                {data.twitter && <TwitterTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  copySuccessful={copySuccessful}
                />}

                {data.github && <GithubTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  copySuccessful={copySuccessful}
                />}

                {data.website && <WebsiteTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  copySuccessful={copySuccessful}
                />}
              </div>)}

            <HoverFooterTemplate
              data={data}
              hasWeb3Mobile={hasWeb3Mobile}
              handleCopySuccessful={handleCopySuccessful}
              copySuccessful={copySuccessful}
            />
          </div>
        </div>
      );
    }
  if (React) HoverTemplate = React.forwardRef(HoverTemplate)

  const HoverFooterTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, copySuccessful }) => (
    <div className={style.boxLink}>
      <CopyButton address={data.address} />

      {hasWeb3Mobile
        ? <HoverFooterWeb3MobileLink data={data} handleCopySuccessful={handleCopySuccessful} />
        : <HoverFooterLink data={data} />}

      {copySuccessful === 'footer' && <FontAwesomeIcon icon={faCheck} className={style.profileCheck} />}
    </div>
  );

  const HoverFooterWeb3MobileLink = ({ data, handleCopySuccessful }) => (
    <p
      onClick={() => addToClipBoardLinks(
        `https://3box.io/${data.address}`,
        handleCopySuccessful,
        'footer'
      )}
      className={style.boxLinkText}
    >
      View 3Box
    <img src="https://i.imgur.com/bT9PQlL.png" className={style.logo} />
    </p>
  );

  const HoverFooterLink = ({ data }) => (
    <a
      className={style.boxLinkText}
      href={`https://3box.io/${data.address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View 3Box
      <img src="https://i.imgur.com/bT9PQlL.png" className={style.logo} />
    </a>
  );

  const CoverPictureTemplate = ({ data = {}, opts = {} }) => {
    return (
      <Fragment>
        {
          (!opts.noCoverImg && !opts.noImgs) && (
            <div className={style.coverPicture}>
              {data.coverPhoto ? <img src={data.coverPhoto} className={style.coverPicture_image} />
                : <div className={style.coverPicture_image} />}
            </div>
            )
        }
      </Fragment>
    )
  }

  let AddressBarTemplate =
    ({
      data = {},
      opts = {},
      showHover,
      isMobile,
      handleShowHover,
      hasWeb3Mobile,
      handleCopySuccessful,
      copySuccessful,
      loading
    },
      ref
    ) => {
      return (
        <div
          className={`${style.boxAddress} ${data.addressDisplay.length >= 15 ? style.boxAddressFull : ''} ${opts.tileStyle ? style.tileStyle : ''}`}
        >
          <div
            className={`${style.boxAddressContentWrapper} ${opts.url ? style.boxAddressLink : ''}`}
            onClick={() => { if (opts.url) window.location = `${opts.url}`; }}
          >
            <div className={style.boxImg}>
              {data.imgSrc && <img src={data.imgSrc} />}
            </div>

            <div className={style.boxShortAddress}>
              {(opts.showName && data.name) ? data.name : data.addressDisplay}
            </div>
          </div>

          {isMobile && (
            <button
              className={style.openHover_mobile}
              onClick={() => handleShowHover(true)}
            >
              <div className="far fa-clone clone" />
            </button>)}

          <HoverTemplate
            data={data}
            opts={opts}
            ref={ref}
            showHover={showHover}
            hasWeb3Mobile={hasWeb3Mobile}
            handleCopySuccessful={handleCopySuccessful}
            copySuccessful={copySuccessful}
            loading={loading}
          />
        </div>
      )
    }
  if (React) AddressBarTemplate = React.forwardRef(AddressBarTemplate)

  const ProfilePictureTemplate = ({ data = {}, opts = {} }) => {
    return (
      <Fragment>
        {(!opts.noProfileImg && !opts.noImgs) && (
          <div className={`${style.profileValuePicture} ${(opts.noCoverImg || !data.coverPhoto) ? style.noMargin : ''}`}>
            <img className={`${style.profileValuePicture_image}`} src={data.imgSrc} height="32px" width="32px" />
          </div>
        )}
        {(opts.noProfileImg && !opts.noImgs) && (<div className={style.noProfileImgSpacer} />)}
      </Fragment>)
  }

  const DescriptionTemplate = ({ data = {} }) => (
    <div className={style.profileDescription}>
      <p className={style.profileDescription_text}>{data.description}</p>
    </div>
  )

  const NameTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, copySuccessful }) => (
    <div className=
      {`
      ${style.profileValueName} 
      ${(!data.description && !data.twitter && !data.github && !data.website) ? style.noContent : ''}
      `}
    >
      {hasWeb3Mobile ? (
        <p
          onClick={() => addToClipBoardLinks(
            `https://3box.io/${data.address}`,
            handleCopySuccessful,
            'threeBoxProfile'
          )}
          className={style.profileText}>
          {data.name}
        </p>
      ) : (<a
        href={`https://3box.io/${data.address}`}
        className={style.profileText}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.name}
      </a>)}
      {data.emoji && <span>{data.emoji}</span>}

      {copySuccessful === 'threeBoxProfile' && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const WebsiteTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, copySuccessful }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Website</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <SocialWeb3Link
            handleCopySuccessful={handleCopySuccessful}
            link={data.websiteUrl}
            field="website"
            handle={data.website}
          />
        ) : (<a href={data.websiteUrl} target="_blank">
          {data.website}
        </a>)}
      </span>
      {copySuccessful === 'website' && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const GithubTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, copySuccessful }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Github</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <SocialWeb3Link
            handleCopySuccessful={handleCopySuccessful}
            link={'https://www.github.com/' + data.github}
            field="github"
            handle={data.github}
          />
        ) : (<a href={'https://www.github.com/' + data.github} target="_blank">
          {data.github}
        </a>)}
      </span>
      {copySuccessful === 'github' && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const TwitterTemplate = ({ data = {}, hasWeb3Mobile, copySuccessful, handleCopySuccessful }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Twitter</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <SocialWeb3Link
            handleCopySuccessful={handleCopySuccessful}
            link={`https://www.twitter.com/${data.twitter}`}
            field="twitter"
            handle={`@${data.twitter}`}
          />
        ) : <a href={'https://www.twitter.com/' + data.twitter} target="_blank">
            {`@${data.twitter}`}
          </a>}
      </span>
      {copySuccessful === 'twitter' && <FontAwesomeIcon icon={faCheck} />}
    </div >
  );

  const SocialWeb3Link = ({ handleCopySuccessful, link, field, handle }) => (
    <p onClick={() => addToClipBoardLinks(link, handleCopySuccessful, field)}>
      {handle}
    </p>
  );

  let LoadingTemplate = ({ data = {}, opts = {}, showHover, isMobile, checkWindowSize }, ref) => {
    return (
      <div
        className={`${style.boxAddressWrap} ${!isMobile ? style.isDesktop : ''}`}
        onMouseEnter={() => checkWindowSize(!isMobile)}
      >
        {opts.html ? (
          <Fragment>
            <div id="orginal_html_f1kx">{opts.html}</div>
            <HoverTemplate
              data={data}
              opts={opts}
              showHover={showHover}
              loading
              ref={ref}
            />
          </Fragment>
        ) : (
            <AddressBarTemplate
              data={data}
              opts={opts}
              isMobile={isMobile}
              loading
              ref={ref}
            />)}
      </div>
    )
  }
  if (React) LoadingTemplate = React.forwardRef(LoadingTemplate)

  return {
    BaseTemplate,
    LoadingTemplate,
  }
}
