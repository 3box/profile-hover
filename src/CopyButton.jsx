import dom from 'jsx-render';
const style = require('style-loader!./style.less');

export const CopyButton = ({ address }) => {
  const onClick = `boxCopyAddress_f1kx(this, '${address}')`;
  return (
    <div className={style.addressCopy} onClick={onClick}>
      <i className="far fa-clone clone"></i>
      <i className="fas fa-check check" style={{display: 'none'}}></i>
    </div>
  );
};

