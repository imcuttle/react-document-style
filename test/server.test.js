/**
 * @file server
 * @author Cuttle Cong
 * @date 2018/2/23
 * @description
 * @jest-environment node
 */

import * as React from 'react'
import ReactDOM from 'react-dom/server.node'
import Style from '../src/index'

describe('server side', function () {
  it('should has displayName', function (done) {
    const elem = <Style css={"a {}"}/>
    expect(
      elem.type.displayName
    ).toBe('SideEffect(DocumentStyle)')

    done()
  })

  beforeEach(function () {
    Style.rewind()
  })

  it('should simple tree pass', function (done) {
    expect(ReactDOM.renderToStaticMarkup(<Style css={"a {}"}/>)).toBe('')
    expect(Style.canUseDOM).toBe(false)
    expect(Style.peek()).toBe('a {}')
    expect(Style.rewind()).toBe('a {}')
    done()
  })

  it('should nested dom tree pass', function (done) {
    const markup = ReactDOM.renderToStaticMarkup(
      <Style css={"a {}"}>
        <div>
          <Style css={"b {}"}>
            <Style css={"c {}"}/>
          </Style>
          <Style css={"d {}"}/>
        </div>
      </Style>
    )
    expect(markup).toBe('<div></div>')
    expect(Style.peek()).toBe('a {}\nb {}\nc {}\nd {}')
    expect(Style.rewind()).toBe('a {}\nb {}\nc {}\nd {}')
    done()
  })

  it('should throws error when multiply children', function (done) {
    expect(() => {
      ReactDOM.renderToStaticMarkup(
        <Style css={"a {}"}>
          <Style css={"b {}"}>
            <Style css={"c {}"}/>
          </Style>,
          <Style css={"d {}"}/>
        </Style>
      )
    }).toThrow(/expected to receive a single React element child/)
    done()
  })

  it('should non-style component rendered', function (done) {
    let markup = ReactDOM.renderToStaticMarkup(
      <Style css={"a {}"}>
        <span>abc</span>
      </Style>
    )
    expect(markup).toBe('<span>abc</span>')
    ReactDOM.renderToStaticMarkup(<Style css={"b {}"}/>)
    expect(Style.rewind()).toBe('a {}\nb {}')

    ReactDOM.renderToStaticMarkup(
      <div>
        <Style css={"c {}"}/>,
        <Style css={"d {}"}/>,
      </div>
    )
    expect(Style.rewind()).toBe('c {}\nd {}')
    done()
  })
})
