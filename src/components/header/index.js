import React, { useState, useRef, useEffect } from 'react'
import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpeg'
import { useClickOutside } from '../add-resource'
import './style.scss'

export function Header () {
  const [collapse, toggleCollapse] = useState(true)
  const dropdown = useClickOutside(() => toggleCollapse(true))
  return (
    <div className="cruise-header">
      <img className="cruise-header-logo" src={logo} />
      <div className="cruise-header-avatar" ref={dropdown}>
        <img src={avatar} />
        <i onClick={() => toggleCollapse(!collapse)} className={`cruise-header-arrow ${collapse ? 'icon-angle-down' : 'icon-angle-up'}`} />
        {
          !collapse && (
            <div className="cruise-header-dropdown">
              <div className="cruise-header-dropdown-item"><i className="icon-id-card"/>Profile</div>
              <div className="cruise-header-dropdown-item"><i className="icon-sign-in" />Sign Out</div>
            </div>
          )
        }
      </div>
    </div>
  )
}