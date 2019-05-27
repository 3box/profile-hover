import dom from 'jsx-render';
const style = require('style-loader!./style.less');

export const CopyButton = ({ address }) => {
  const onClick = `boxCopyAddress_f1kx(this, '${address}')`;
  return (
    <div className={style.addressAndCheck}>
      <div className={style.addressWrapper} onClick={onClick} >
        <img src="https://i.imgur.com/zs8M8dg.png" alt="Wallet" />
        <p className={style.address}>
          {`${address.substr(0, 5)}...${address.substr(-5)}`}
        </p>
        <i className="fas fa-check check" style={{display: 'none'}}></i>
      </div>
    </div>

  );
};
