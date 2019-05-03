import React, {useState} from 'react'
import './style.scss'

const histories = Array.from({length: 15}).map((item,ind) => {
  return { id: ind, text: `bjstdmngbgr${ ind < 10 ? '0'+ind : ind }/Acceptance_test` }
})
const menus = [
  {
    iconClassName: 'icon-dashboard',
    text: 'dashboard',
  },
  {
    iconClassName: 'icon-sitemap',
    text: 'agent',
  },
  {
    iconClassName: 'icon-boat',
    text: 'my cruise',
  },
  {
    iconClassName: 'icon-life-bouy',
    text: 'help',
  },
]

export function Sidebar () {
  const [checked, setChecked] = useState(1)
  return (
    <div className="cruise-sidebar-container">
      <ul className="cruise-sidebar-menu">
        {
          menus.map((item,ind) => (
            <li 
              key={ind}
              className={`cruise-sidebar-menu-list-item ${checked === ind ? 'checked' : ''}`} 
              onClick={() => setChecked(ind)}
            >
              <i className={item.iconClassName}/>
              {item.text}
            </li>
          ))
        }
      </ul>
      <div className="cruise-sidebar-history">
        <h3 className="cruise-sidebar-history-title">History</h3>
        {
          histories.length > 0 && (
            <ul className="cruise-sidebar-history-list">
              {
                histories.map(item => <li className="cruise-sidebar-history-list-item" key={item.id}>{item.text}</li>)
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}