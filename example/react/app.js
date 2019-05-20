import React from 'react';
import ReactDOM from 'react-dom';
import ProfileHover from '../../dist/reactBundle';

const Example = ({}) => {
  return (
    <>
      <div className='ethAddress'>
        <ProfileHover orientation="right" noImg address='0xE3b281F3Dd2b87c7b3EAcC0402a4FD7d827F2956' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" noImg address='0xf3b281F3Dd2b87c7b3EAcC0402a4FD7d827F2956' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" address='0x258ddd84abf61ba1d1e39f95d8863ee9ca218c06' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" noImg address='0xbaebb7d18f8b16b0a970fda91f1efa626d67423e' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" address='0xff326878d13b33591d286372e67b4af05cd100bd' />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" noImg address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' fullDisplay />
      </div>
      <div className='ethAddress'>
        <ProfileHover orientation="right" address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1' noTheme>
          0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1
        </ProfileHover>
      </div>
    </>
  )
}

const appContainer = document.getElementById('reactApp');
ReactDOM.render(<Example />, appContainer);