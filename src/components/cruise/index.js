import React from 'react'
import { Header } from 'components/header'
import { Sidebar } from '../sidebar'
import { Agents } from '../agents'
import './style.scss'


export function Cruise () { 
  return (
    <div className="cruise-container">
      <Header />
      <div className="cruise-body">
        <Sidebar />
        <div className="cruise-content"><Agents /></div>
      </div>
    </div>
  )
}


