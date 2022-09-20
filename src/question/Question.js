import React, { useState } from 'react'

export default function Question({
  index,
  text,
  setChosen,
  dragDrop,
  updateQuestions,
  handleDelete,
  handleScoreUpdate,
}) {
  const [answer, setAnswer] = useState('na')
  const [needsComment, setNeedsComment] = useState(false)
  const [comment, setComment] = useState('')
  const isEven = index % 2 === 1 ? 'is-even' : ''

  const handleChange = (e) => {
    handleScoreUpdate()
    setAnswer(e.target.value)
  }

  const dragStart = (item) => {
    setChosen(item.target)
  }

  const dragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div
      className={`drop-area ${isEven}`}
      data-index={index}
      onDragOver={dragOver}
      onDrop={(e) => dragDrop(e)}
    >
      <div
        className="drag-item"
        draggable="true"
        data-index={index}
        onDragStart={dragStart}
      >
        <div className="question print-hide">
          <div className="handle handle-question">
            <span className="material-symbols-outlined">drag_handle</span>
          </div>
          <form className="radio-inputs">
            <label>
              <input
                type="radio"
                name="question"
                value="yes"
                checked={answer === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="question"
                value="no"
                checked={answer === 'no'}
                onChange={handleChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="question"
                value="na"
                checked={answer === 'na'}
                onChange={handleChange}
              />
              N/A
            </label>
          </form>
          <div className="text-inputs">
            <div className="question-text">
              <input
                type="text"
                className="question-input"
                placeholder="Enter a question"
                value={text}
                onChange={(e) => {
                  updateQuestions(e.target.value, index)
                }}
              />
            </div>
            <div className="question-text">
              {needsComment && (
                <textarea
                  className={`question-comment ${
                    index % 2 === 0 ? 'is-even' : ''
                  }`}
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              )}
            </div>
          </div>
          <div className="comment-check">
            <label>
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
                onChange={(e) => setNeedsComment(e.target.checked)}
                value={needsComment}
              />
              Require a comment?
            </label>
          </div>
          <div className="comment-check">
            <button
              onClick={() => handleDelete(index)}
              style={{
                backgroundColor: 'rgb(240, 65, 100)',
                color: 'white',
                cursor: 'pointer',
                border: '1px solid black',
                borderRadius: '3px',
                aspectRatio: 1,
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
        {/* Desktop above, print below */}
        <div className="questions-print desktop-hide">
          <div className="answer">
            <span className={`answer-box answer-box-${answer}`}></span>
            <span className={`answer-text answer-text-${answer}`}>
              {answer === 'na' ? 'No Answer' : answer}
            </span>
          </div>
          <div className="questions-fields">
            <div>{text}</div>
            {needsComment && (
              <textarea
                className={`question-comment-print ${
                  index % 2 === 0 ? 'is-even' : ''
                }`}
                placeholder="Comment text here"
                rows={3}
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
