# react-document-style  

We could render style component either client or server side via [`react-side-effect`](https://github.com/gaearon/react-side-effect).

[![build status](https://img.shields.io/travis/imcuttle/react-document-style/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/react-document-style)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/react-document-style.svg?style=flat-square)](https://codecov.io/github/imcuttle/react-document-style?branch=master)
[![NPM version](https://img.shields.io/npm/v/react-document-style.svg?style=flat-square)](https://www.npmjs.com/package/react-document-style)
[![NPM Downloads](https://img.shields.io/npm/dm/react-document-style.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/react-document-style)

- UMD
unpak

## Usage

The Component writing like here.
```javascript
import Style from 'react-document-style'
const css = 'body { color: red; }'

export default () => (
  <Style css={css}>
    <div>
      Hi
      <Style css={'div { color: blue; }'}/>
    </div>
  </Style>
)
```

- Client  
Would create a style DOM in `head`
```html
<head>
<style type="text/css">
body { color: red; }
div { color: blue; }
</style>
</head>
```

- Server  
Call `rewind` or `peek` to get the css string on server side **after render component**.  
please see the doc about [react-side-effect](https://github.com/gaearon/react-side-effect/) for more information
```js
ReactServerDOM.renderToString(<Style css={'div { color: blue; }'}/>)
Style.peek() // div { color: blue; }
Style.rewind() // div { color: blue; }
Style.peek() // undefined
```
