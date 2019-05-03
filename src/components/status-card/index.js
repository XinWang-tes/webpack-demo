import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'


export function StatusCard ({
  title,
  iconClassName,
  total,
}) {
  return (
    <div className={`cruise-status-card-container ${title}`}>
      <span className="cruise-status-card-title">{title}</span>
      <i className={`cruise-status-card-icon ${iconClassName}`} />
      <strong className="cruise-status-card-total">{total}</strong>
    </div>
  )
}

StatusCard.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  total: PropTypes.number,
}