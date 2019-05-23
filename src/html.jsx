const { CopyButton } = require('./CopyButton');
const { addToClipboard, addToClipBoardLinks } = require('./utils');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faCheck } = require('@fortawesome/free-solid-svg-icons/faCheck');
const style = require('style-loader!./style.less');

module.exports = ({ dom, React, Fragment }) => {
  const BaseTemplate = React.forwardRef(
    ({
      data = {},
      opts = {},
      checkWindowSize,
      showHover,
      isMobile,
      handleShowHover,
      hasWeb3Mobile,
      twitterCopied,
      githubCopied,
      websiteCopied,
      threeBoxCopied,
      threeBoxFooterCopied,
      handleCopySuccessful
    },
      ref) => {
      return (
        <div
          className={`
        ${style.boxAddressWrap} 
        ${!isMobile ? style.isDesktop : ''}
        `}
          onMouseEnter={() => checkWindowSize(!isMobile)}
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
                hasWeb3Mobile={hasWeb3Mobile}
                handleCopySuccessful={handleCopySuccessful}
                twitterCopied={twitterCopied}
                githubCopied={githubCopied}
                websiteCopied={websiteCopied}
                threeBoxCopied={threeBoxCopied}
                threeBoxFooterCopied={threeBoxFooterCopied}
              />
            </Fragment>
          ) : <AddressBarTemplate
              data={data}
              opts={opts}
              ref={ref}
              showHover={showHover}
              isMobile={isMobile}
              handleShowHover={handleShowHover}
              handleCopySuccessful={handleCopySuccessful}
              hasWeb3Mobile={hasWeb3Mobile}
              twitterCopied={twitterCopied}
              githubCopied={githubCopied}
              websiteCopied={websiteCopied}
              threeBoxCopied={threeBoxCopied}
              threeBoxFooterCopied={threeBoxFooterCopied}
            />}
          {showHover && <div className={style.onClickOutsideMobile} onClick={() => handleShowHover(true)} />}
        </div>
      );
    });

  const HoverTemplate = React.forwardRef(
    ({
      data = {},
      opts = {},
      showHover,
      hasWeb3Mobile,
      githubCopied,
      websiteCopied,
      threeBoxCopied,
      threeBoxFooterCopied,
      twitterCopied,
      handleCopySuccessful
    },
      ref) => {
      return (
        <div className={`${style.hoverWrap} ${style[opts.orientation]} ${showHover ? style.showHoverMobile : ''}`}>
          <div className={style.hoverProfile} ref={ref}>
            {opts.loading && <div className={style.loadingText}> Loading ... </div>}

            {data.coverPhoto && <CoverPictureTemplate data={data} opts={opts} />}
            {data.imgSrc && <ProfilePictureTemplate data={data} opts={opts} />}

            {data.name && <NameTemplate
              data={data}
              hasWeb3Mobile={hasWeb3Mobile}
              handleCopySuccessful={handleCopySuccessful}
              threeBoxCopied={threeBoxCopied}
            />}

            {data.description && <DescriptionTemplate data={data} />}

            {(data.twitter || data.github || data.website) && (
              <div className={style.profileDetails}>
                {data.twitter && <TwitterTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  twitterCopied={twitterCopied}
                />}

                {data.github && <GithubTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  githubCopied={githubCopied}
                />}

                {data.website && <WebsiteTemplate
                  data={data}
                  hasWeb3Mobile={hasWeb3Mobile}
                  handleCopySuccessful={handleCopySuccessful}
                  websiteCopied={websiteCopied}
                />}
              </div>)}

            <HoverFooterTemplate
              data={data}
              hasWeb3Mobile={hasWeb3Mobile}
              handleCopySuccessful={handleCopySuccessful}
              threeBoxFooterCopied={threeBoxFooterCopied}
            />
          </div>
        </div>
      );
    });

  const HoverFooterTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, threeBoxFooterCopied }) => (
    <div className={style.boxLink}>
      <CopyButton address={data.address} />

      {hasWeb3Mobile ? (
        <p onClick={() => addToClipBoardLinks(
          `https://3box.io/${data.address}`,
          handleCopySuccessful,
          'threeBoxFooterCopied'
        )}
          className={style.boxLinkText}
        >
          View 3Box
          <img src="https://i.imgur.com/bT9PQlL.png" className={style.logo} />
        </p>
      ) : (<a
        className={style.boxLinkText}
        href={`https://3box.io/${data.address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View 3Box
        <img src="https://i.imgur.com/bT9PQlL.png" className={style.logo} />
      </a>)}

      {threeBoxFooterCopied && <FontAwesomeIcon icon={faCheck} className={style.profileCheck} />}
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

  const AddressBarTemplate = React.forwardRef(
    ({
      data = {},
      opts = {},
      showHover,
      isMobile,
      handleShowHover,
      hasWeb3Mobile,
      handleCopySuccessful,
      twitterCopied,
      githubCopied,
      websiteCopied,
      threeBoxCopied,
      threeBoxFooterCopied,
    },
      ref
    ) => {
      return (
        <div
          className={`
        ${style.boxAddress} 
        ${data.addressDisplay.length >= 15 ? style.boxAddressFull : ''}
        `}
        >
          <div
            className={`
          ${style.boxAddressContentWrapper}
          ${opts.url ? style.boxAddressLink : ''}
          `}
            onClick={() => {
              if (opts.url) window.location = `${opts.url}`;
            }}
          >
            <div className={style.boxImg}>
              {data.imgSrc && <img src={data.imgSrc} />}
            </div>

            <div className={style.boxShortAddress}>
              {data.addressDisplay}
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
            twitterCopied={twitterCopied}
            githubCopied={githubCopied}
            websiteCopied={websiteCopied}
            threeBoxCopied={threeBoxCopied}
            threeBoxFooterCopied={threeBoxFooterCopied}
            handleCopySuccessful={handleCopySuccessful}
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

  const NameTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, threeBoxCopied }) => (
    <div className={style.profileValueName}>
      {hasWeb3Mobile ? (
        <p
          onClick={() => addToClipBoardLinks(
            `https://3box.io/${data.address}`,
            handleCopySuccessful,
            'threeBoxCopied'
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

      {threeBoxCopied && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const WebsiteTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, websiteCopied }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Website</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <p onClick={() => addToClipBoardLinks(
            data.websiteUrl,
            handleCopySuccessful,
            'websiteCopied'
          )}>
            {data.website}
          </p>
        ) : (<a href={data.websiteUrl} target="_blank">
          {data.website}
        </a>)}
      </span>
      {websiteCopied && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const GithubTemplate = ({ data = {}, hasWeb3Mobile, handleCopySuccessful, githubCopied }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Github</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <p onClick={() => addToClipBoardLinks(
            'https://www.github.com/' + data.github,
            handleCopySuccessful,
            'githubCopied'
          )}>
            {data.github}
          </p>
        ) : (<a href={'https://www.github.com/' + data.github} target="_blank">
          {data.github}
        </a>)}
      </span>
      {githubCopied && <FontAwesomeIcon icon={faCheck} />}
    </div>
  )

  const TwitterTemplate = ({ data = {}, hasWeb3Mobile, twitterCopied, handleCopySuccessful }) => (
    <div className={style.profileValue}>
      <p className={style.profileValueKey}>Twitter</p>
      <span className={style.profileText}>
        {hasWeb3Mobile ? (
          <p
            onClick={() => addToClipBoardLinks(
              `https://www.twitter.com/${data.twitter}`,
              handleCopySuccessful,
              'twitterCopied'
            )}
          >
            {`@${data.twitter}`}
          </p>
        ) : <a href={'https://www.twitter.com/' + data.twitter} target="_blank">
            {`@${data.twitter}`}
          </a>}
      </span>
      {twitterCopied && <FontAwesomeIcon icon={faCheck} />}
    </div >
  )

  const LoadingTemplate = ({ data = {}, opts = {}, showHover, isMobile }) => {
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
              isMobile={isMobile}
            />)}
      </div>
    )
  }

  return {
    BaseTemplate,
    LoadingTemplate,
  }
}

