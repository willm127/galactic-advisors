import { useState } from 'react'
import { v4 } from 'uuid'

import Question from '../../question/Question'

export default function Section({
  index,
  sectionName,
  setSectionName,
  handleScoreUpdate,
}) {
  const [questions, setQuestions] = useState([''])
  const [keys, setKeys] = useState([v4()])
  const [chosen, setChosen] = useState(null)
  const [error, setError] = useState('')

  const getParent = (el) => {
    // recursion on dom backwards until we find the drop area
    if (!el.classList.contains('drop-area')) {
      return getParent(el.parentElement)
    }
    return el
  }

  const updateQuestions = (text, index) => {
    setError('')
    setQuestions((prev) => {
      prev[index] = text
      return [...prev]
    })
  }

  const dragDrop = (e) => {
    // get the item ID
    const chosenID = chosen.dataset.index

    // get the drop area ID
    let area = getParent(e.target)
    const areaID = area.dataset.index

    // swap items in questions list
    const newQuestions = [...questions]
    const chosenQuestion = questions[chosenID]
    const areaQuestion = questions[areaID]
    newQuestions[areaID] = chosenQuestion
    newQuestions[chosenID] = areaQuestion

    // set questions to trigger re-render
    setQuestions(newQuestions)

    // also swap keys
    const newKeys = [...keys]
    const chosenKey = keys[chosenID]
    const areaKey = keys[areaID]
    newKeys[areaID] = chosenKey
    newKeys[chosenID] = areaKey

    setKeys(newKeys)
  }

  const handleDelete = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions([...newQuestions])

    const newKeys = [...keys]
    newKeys.splice(index, 1)
    setKeys([...newKeys])
  }

  return (
    <>
      {index % 2 === 1 && <hr />}
      <div className="section-area" data-index={index}>
        <div className="section" data-index={index}>
          <div className="section-top">
            {/* <div className="handle">
            <span className="material-symbols-outlined">drag_handle</span>
          </div> */}
            <div>
              <input
                type="text"
                className="question-input print-hide"
                placeholder="Section Title"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value, index)}
                size={50}
              />
              <h3 className="section-title-print desktop-hide">
                {sectionName}
              </h3>
            </div>
          </div>
          {questions.map((q, index) => (
            <Question
              key={keys[index]}
              index={index}
              text={q}
              chosen={chosen}
              updateQuestions={updateQuestions}
              setChosen={setChosen}
              dragDrop={dragDrop}
              handleDelete={handleDelete}
              handleScoreUpdate={handleScoreUpdate}
            />
          ))}
          {error && <div className="error print-hide">{error}</div>}
          <div className="print-hide">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="add-question-btn"
                onClick={() => {
                  setQuestions((prev) => [...prev, ''])
                  setKeys((prev) => [...prev, v4()])
                }}
              >
                Add a question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
