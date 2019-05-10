[![Discord](https://img.shields.io/discord/484729862368526356.svg?style=for-the-badge)](https://discordapp.com/invite/Z3f3Cxy)
[![npm](https://img.shields.io/npm/v/profile-hover.svg?style=for-the-badge)](https://www.npmjs.com/package/profile-hover)
[![Twitter Follow](https://img.shields.io/twitter/follow/3boxdb.svg?style=for-the-badge&label=Twitter)](https://twitter.com/3boxdb)

## Profile Hover

A drop in profile hover for any ethereum address.

![Profile Hover](./example/profile-hover.gif)

### React component
Installation:

```javascript
npm i -S profile-hover
```

Usage:

```javascript
import ProfileHover from 'profile-hover';

const MyComponent = () => (<ProfileHover address={'0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'} />);
```

Add `displayFull` property to show the entire address instead of the shorten display.

```javascript
<ProfileHover address={'0xa8ee0...'} displayFull />
```

Add `noTheme` property to not use any of our address bar styling. Allows you to wrap any existing elements in an address hover.

```javascript
<ProfileHover address={'0xa8ee0...'} noTheme>
  ... your own html and styling
</ProfileHover>
```

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

