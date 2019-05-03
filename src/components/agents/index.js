import React, { useState, useEffect, Fragment } from 'react'
import { StatusCard } from '../status-card'
import { ControlBar } from '../control-bar'
import { AgentCard } from '../agent-card'
import * as api from '../../api'
import './style.scss'


export function Agents () {
  const [agents, setAgents] = useState([])
  const [chosenType, setType] = useState('all')
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    api.getAgents().then(data => setAgents(data))
  },[])

  const handleDeleteResource = (resource, id) => {
    const agent = agents.find(m => m.id === id)
    const newResources = agent.resources.filter(m => m !== resource)
    const newAgent = { ...agent, resources: newResources }
    try {
      api.updateAgent(newAgent, id).then(() => {
        api.getAgents().then(data => setAgents(data))
      })
    } catch (error) {}
  }

  const handleAddResource = (newResources, id) => {
    const agent = agents.find(m => m.id === id)
    const newAgent = { ...agent, resources: agent.resources.concat(newResources) }
    try {
      api.updateAgent(newAgent, id).then(() => {
        api.getAgents().then(data => setAgents(data))
      })
    } catch (error) {}
  }

  const calcCategory = (array, category) => {
    let result = category === 'status' ? { "building": 0 } : {}
    array.forEach(m => {
      const ind = Object.keys(result).findIndex(k => m[category] === k)
      ind === -1 ? result[m[category]] = 1 : result[m[category]] ++
    })
    return result
  }
  const status = calcCategory(agents, 'status')
  const types = calcCategory(agents, 'type')
  const allTypes = { all: agents.length, ...types }

  return (agents && agents.length) > 0 ? (
    <Fragment>
      <div className="cruise-agents-content-cards">
        {
          Object.keys(status).map((m,i) => (
            <StatusCard key={i} title={m} total={status[m]} iconClassName={m === 'idle' ? "icon-coffee" : "icon-cog"} />
          ))
        }
        <ul className="cruise-agents-types">
          {
            Object.keys(allTypes).map((m,i) => (
              <li key={i} className="cruise-agents-types-item">
                <p>{m}</p>
                <strong>{allTypes[m]}</strong>
              </li>
            ))
          }
        </ul>
      </div>
      <ControlBar 
        chosenType={chosenType} 
        types={allTypes} 
        onChangeType={type => setType(type)} 
        onSearch={val => setSearchText(val)}
      />
      {
        agents
        .filter(m => chosenType === 'all' ? true : m.type === chosenType)
        .filter(m => m.name.includes(searchText))
        .map(m => (
          <AgentCard 
            key={m.id}
            id={m.id}
            name={m.name}
            status={m.status}
            os={m.os}
            ip={m.ip}
            location={m.location}
            resources={m.resources}
            onDelete={(resource) => handleDeleteResource(resource, m.id)}
            onAddResource={(resource) => handleAddResource(resource, m.id)}
          />
        ))
      }
    </Fragment>
  ) : (
    <div>no agents</div>
  )
}


