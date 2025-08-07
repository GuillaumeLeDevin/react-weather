import React from 'react'
import './Tab.css'

export default function Tab({tab, activeTab, index, onClick}) {
  return (
      <button
        key={index}
        className={`tab ${activeTab === index ? "active" : ""}`}
        onClick={onClick}
      >
        {tab}
      </button>
  )
}
