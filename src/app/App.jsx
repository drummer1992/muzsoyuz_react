import React from 'react'
import s from './App.module.css'
import Routes from "../routes/Routes"

function App() {
  return (
    <React.Fragment>
      <div className={s.wrapper}>
        <Routes/>
      </div>
    </React.Fragment>
  )
}

export default App