import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

/** custom clickoutside hook */
export function useClickOutside (closeFunc) {
  const node = useRef()
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    closeFunc()
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])
  return node
}

AddResource.propTypes = {
  onAddResource: PropTypes.func,
  resources: PropTypes.arrayOf(PropTypes.string)
}
export function AddResource ({ onAddResource, resources }) {
  const [popupVisible, setPopupVisible] = useState(false)
  const [resource, addResource] = useState('')
  const popRef = useClickOutside(() => setPopupVisible(false))

  const handleAdd = () => {
    if(!resource){
      alert('This should not be empty.')
      return
    }
    const newResources = resource.split(',').filter(m => m)
    let repeat = false
    newResources.forEach(m => {
      const exist = resources.find(k=> m===k)
      if(exist){
        repeat = true
        alert('Do not add repeat resource.^_^')
        return
      } 
    })
    if(!repeat){
      onAddResource(newResources)
      addResource('')
      setPopupVisible(false)
    }
  }
  return (
    <div ref={popRef} className="cruise-add-resource-container">
      <button onClick={() => setPopupVisible(!popupVisible)} className="cruise-add-resource-add-btn"><i className="icon-plus cruise-add-resource-plus" /></button>
      {
        popupVisible && (
          <div className="cruise-add-resource-popup">
            <p className="cruise-add-resource-text">Seperate multiple resource name with commas</p>
            <input onChange={e => addResource(e.target.value)} className="cruise-add-resource-input" type="text" placeholder="Input value" />
            <div className="cruise-add-resource-btns">
              <button onClick={handleAdd} className="cruise-add-resource-btn--add">Add Resource</button>
              <button onClick={() => setPopupVisible(false)} className="cruise-add-resource-btn--cancel">Cancel</button>
            </div>
            <button onClick={() => setPopupVisible(false)} className="cruise-add-resource-close"><i className="icon-close"/></button>
          </div>
        )
      }
    </div>
  )
}
