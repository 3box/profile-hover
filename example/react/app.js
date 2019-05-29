import React from 'react';
import ReactDOM from 'react-dom';
import ProfileHover from '../../dist/reactBundle';

const Example = ({}) => {
  return (
    <>
      <div className='ethAddress'>
        <ProfileHover orientation="top" url="www.yahoo.com" address='0xE3b281F3Dd2b87c7b3EAcC0402a4FD7d827F2956' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" noImgs address='0xf3b281F3Dd2b87c7b3EAcC0402a4FD7d827F2956' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" noCoverImg address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" noCoverImg address='0x5c44e8982fa3c3239c6e3c5be2cc6663c7c9387e' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" noImgs address='0xbaebb7d18f8b16b0a970fda91f1efa626d67423e' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" address='0xff326878d13b33591d286372e67b4af05cd100bd' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" noImgs address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' fullDisplay />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="top" address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' noTheme>
          0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1
        </ProfileHover>
      </div>
    </>
  )
}

const appContainer = document.getElementById('reactApp');
ReactDOM.render(<Example />, appContainer);
