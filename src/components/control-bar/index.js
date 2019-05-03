import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

ControlBar.propTypes = {
  types: PropTypes.shape(),
  onChangeType: PropTypes.func,
  chosenType: PropTypes.string,
  onSearch: PropTypes.func,
}
export function ControlBar ({ types = {}, chosenType, onChangeType, onSearch}) {
  const [focus, toggleFocus] = useState(false)
  function debounce (func, delay) {
    var timer
    return function (...args) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
  }
  return (
    <div className="cruise-control-bar-container">
      <div className="cruise-control-bar-left">
        <ul className="cruise-control-bar-tabs">
          {
            Object.keys(types).map((m,i) => (
              <li key={i} className={`cruise-control-bar-tab ${chosenType === m ? 'checked' : ''}`} onClick={() => onChangeType(m)}>{m}</li>
            ))
          }
        </ul>
        <div className={`cruise-control-bar-search ${focus ? 'focus' : ''}`}>
          <input onChange={e => onSearch(e.target.value)} onFocus={() => toggleFocus(true)} onBlur={() => toggleFocus(false)} className="cruise-control-bar-search-input" type="text" />
          <i className="icon-search cruise-control-bar-search-btn" />
        </div>
      </div>
      <div className="cruise-control-bar-view">
        <button><i className="cruise-control-bar-view-icon icon-th-card" /></button>
        <button><i className="cruise-control-bar-view-icon checked icon-th-list"/></button>
      </div>
    </div>
  )
}
