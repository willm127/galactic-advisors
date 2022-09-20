import { useState } from 'react'
import { v4 } from 'uuid'

import Header from './components/header/Header'
import Score from './components/score/Score'
import Section from './components/section/Section'

import './App.css'

function App() {
  const [sections, setSections] = useState(['Cool'])
  const [keys, setKeys] = useState([v4()])
  const [score, setScore] = useState(0)

  const handleSectionNameUpdate = (val, index) => {
    setSections((prev) => {
      prev[index] = val
      return [...prev]
    })
  }

  const handleScoreUpdate = () => {
    // gather all checked radios
    var allChecked = document.querySelectorAll('input[type=radio]:checked')
    let count = 0
    for (const checked of allChecked) {
      if (checked.value === 'yes') count++
    }
    console.log('count', count)
    const avg = Math.floor((count / allChecked.length) * 100)
    setScore(avg)
  }

  return (
    <div className="App">
      <Header />

      <Score score={score} />

      <div className="inner-area">
        {sections.map((section, index) => (
          <Section
            key={keys[index]}
            index={index}
            sectionName={section}
            setSectionName={handleSectionNameUpdate}
            handleScoreUpdate={handleScoreUpdate}
          />
        ))}

        <div className="print-hide">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{
                backgroundColor: 'lightgreen',
                border: '1px solid black',
                borderRadius: '3px',
                cursor: 'pointer',
                marginTop: '10px',
                padding: '5px',
              }}
              onClick={() => {
                if (sections[sections.length - 1] === '') return
                setSections((prev) => [...prev, ''])
                setKeys((prev) => [...prev, v4()])
              }}
            >
              Add a new section
            </button>
          </div>
        </div>
      </div>

      <Score score={score} />
      <div className="print-hide">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{
              backgroundColor: 'lightblue',
              border: '1px solid black',
              borderRadius: '3px',
              cursor: 'pointer',
              marginTop: '10px',
              padding: '10px',
              fontSize: '1.25rem',
            }}
            onClick={() => {
              window.print()
            }}
          >
            <span className="material-symbols-outlined">print</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
