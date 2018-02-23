/**
 * @file browser
 * @author Cuttle Cong
 * @date 2018/2/23
 * @description
 * @jest-environment jsdom
 */

import * as React from 'react'
import ReactDOM from 'react-dom'
import Style from '../src/index'

describe('browser side', function () {
  function getStyle() {
    const styles = document.head.getElementsByTagName('style')
    expect(styles.length).toBe(1)
    return styles[0]
  }

  let container
  beforeEach(function () {
    container = document.createElement('div')
  })
  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container)
  })

  it('should simple dom tree pass', function (done) {
    ReactDOM.render(<Style css={"a {}"}/>, container)
    expect(getStyle().textContent).toBe('a {}')
    done()
  })

  it('should nested dom tree pass', function (done) {
    ReactDOM.render(
      <Style css={"a {}"}>
        <div>
          <Style css={"b {}"}>
            <Style css={"c {}"}/>
          </Style>,
          <Style css={"d {}"}/>
        </div>
      </Style>,
      container
    )
    expect(getStyle().textContent).toBe([
      'a {}', 'b {}', 'c {}', 'd {}'
    ].join('\n'))
    done()
  })

  it('should throws error when multiply children', function (done) {
    expect(() => {
      ReactDOM.render(
        <Style css={"a {}"}>
          <Style css={"b {}"}>
            <Style css={"c {}"}/>
          </Style>,
          <Style css={"d {}"}/>
        </Style>,
        container
      )
    }).toThrow(/expected to receive a single React element child/)
    done()
  })

  it('should non-style component rendered', function (done) {
    ReactDOM.render(
      <Style css={"a {}"}>
        <span>abc</span>
      </Style>,
      container
    )
    expect(container.innerHTML).toBe('<span>abc</span>')
    done()
  })
})
