import React from 'react'
import PropTypes from 'prop-types'
import { iconMap } from './utils'
import { AddResource } from '../add-resource'
import './style.scss'

export function AgentCard ({
  os,
  name,
  status,
  ip,
  location,
  resources,
  onDelete,
  onAddResource,
}) {
  return (
    <div className="cruise-agent-card-container">
      <img className="cruise-agent-card-os" src={iconMap[os]}/>
      <div className="cruise-agent-card-top">
        <div className="cruise-agent-card-name"><i className="icon-desktop"/><span>{name}</span></div>
        <span className={`cruise-agent-card-status ${status}`}>{status}</span>
        <div className="cruise-agent-card-ip"><i className="icon-info"/><span>{ip}</span></div>
        <div className="cruise-agent-card-location"><i className="icon-folder"/><span>{location}</span></div>
      </div>
      <div className="cruise-agent-card-bottom">
        <AddResource resources={resources} onAddResource={onAddResource} />
        {
          resources.length > 0 && resources.map((m,k) => (
            <div 
              key={`${k}-${m}`}
              className="cruise-agent-card-resource" 
            >
              <span>{m}</span>
              <i className="icon-trash" onClick={() => onDelete(m)} />
            </div>
          ))
        }
        {
          status === 'building' && <div className="cruise-agent-card-deny"><i className="icon-deny" />Deny</div>
        }
      </div>
    </div>
  )
}

AgentCard.propTypes = {
  name: PropTypes.string,
  os: PropTypes.string,
  status: PropTypes.string,
  ip: PropTypes.string,
  location: PropTypes.string,
  resources: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  onAddResource: PropTypes.func,
}