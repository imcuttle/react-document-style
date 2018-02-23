import withSideEffect from 'react-side-effect'
import * as React from 'react'
import PropTypes from 'prop-types'

let singleStyle

function createStyleDOM(css) {
  const style = document.createElement('style')
  style.textContent = css
  style.type = 'text/css'
  return style
}

function setStyle(css) {
  if (!singleStyle) {
    singleStyle = createStyleDOM(css)
    document.head.appendChild(singleStyle)
  }
  else {
    singleStyle.textContent = css
  }
  return singleStyle
}

class DocumentStyle extends React.Component {
  static displayName = 'DocumentStyle'
  static propTypes = {
    css: PropTypes.string.isRequired
  }

  render() {
    const { children } = this.props
    if (children) {
      return React.Children.only(this.props.children)
    } else {
      return null
    }
  }
}

export default withSideEffect(
  function reducePropsToState(propList) {
    return propList
      .filter(x => !!x.css)
      .map(({ css }) => css)
      .join('\n')
  },
  function handleStateChangeOnClient(css) {
    setStyle(css)
  }
)(DocumentStyle)
