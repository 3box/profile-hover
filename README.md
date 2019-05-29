[![Discord](https://img.shields.io/discord/484729862368526356.svg?style=for-the-badge)](https://discordapp.com/invite/Z3f3Cxy)
[![npm](https://img.shields.io/npm/v/profile-hover.svg?style=for-the-badge)](https://www.npmjs.com/package/profile-hover)
[![Twitter Follow](https://img.shields.io/twitter/follow/3boxdb.svg?style=for-the-badge&label=Twitter)](https://twitter.com/3boxdb)

## Profile Hover

A drop in profile hover for any ethereum address.

![Profile Hover](./example/profile-hover.gif)

### React component
Installation:

```shell
npm i -S profile-hover
```

Usage:

```jsx
import ProfileHover from 'profile-hover';

const MyComponent = () => (<ProfileHover address={'0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'} />);
```

#### Prop Types

| Property | Type          | Default  | Description |
| :-------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | String        |    | `Address` property value is required to work.  Provide an Ethereum address to this property. |
| displayFull    | Boolean        | False   | Add `displayFull` property to show the entire address instead of the shortened display.|
| noTheme    | Boolean       |  False   | Add `noTheme` property to not use any of our address bar styling. Allows you to wrap any existing elements in an address hover.                                                                                                                                                                                                                                                                                                             |
| noImgs    | Boolean        | False   | Add `noImgs` property to prevent displaying of profile image and cover image in the hover element.                                                                                                                    |
| noProfileImg    | Boolean       |  False   | Add `noProfileImg` property to prevent displaying of just the profile image. |
| noCoverImg    | Boolean       |  False   | Add `noCoverImg` property to prevent displaying of just the cover image. |
| orientation    | String       |  `'right'`   | Provide property `orientation` with string `'top'`, `'bottom'`, `'right'` or `'left'` to set which way the hover element will pop up from the base tile.|
| url    | String       |   | Provide property `url` with url string to set where clicking on the base tile will redirect to.|

##### Prop Types example
```jsx
<ProfileHover 
  address={'0xa8ee0...'}
  orientation="bottom"
  noCoverImg
  url="https://3box.io/"
/>
```
```jsx
<ProfileHover 
  address={'0xa8ee0...'} 
  noTheme
>
  ... your own html and styling
</ProfileHover>
```

##### Desktop Behavior VS Mobile Behavior
Given the current state of Web 3 mobile dapp browsers and the absence of browser tab support, the behavior of the profile-hover React component has minor differences depending on device context. 
On desktop, out-bound links within the pop-out hover element work as usual and open a new tab.
On Web3 mobile dapp browsers however, since tabs do not exist, clicking on a link within the hover component will, instead, copy that URL to your clipboard.
Web2 mobile browsers, like on desktop, will open links in a new tab.

### HTML element

First add the script at the end of your page.

```html
  <script type="text/javascript" src="https://unpkg.com/profile-hover"></script>
```

Then add the following tag where ever you display an address.

```html
  <threebox-address data-address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'></threebox-address>
```

Additional Options:

Add `data-display='full'` to show the entire address instead of the shorten display.

```html
  <threebox-address data-address='0xa8ee0...' data-display='full'></threebox-address>
```

Add `data-theme='none'` to not use any of our address bar styling. Allows you to wrap any existing elements in an address hover.

```html
  <threebox-address data-address='0xa8ee0...' data-theme='none'>
    ... your own html and styling
  </threebox-address>
```

