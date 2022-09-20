import React from 'react'

export default function Score({ score }) {
  const scoreClass =
    score <= 33 ? 'score-low' : score > 66 ? 'score-high' : 'score-mid'
  const scoreRating = score <= 33 ? 'Low' : score > 66 ? 'High' : 'Medium'
  return (
    <div className="score">
      <hr />
      <div className="score-info">
        <div className={`score-percentage ${scoreClass}`}>{score}%</div>
        <div className="score-text">
          <strong>Overall Cyber Insurability Score:</strong>&nbsp;
          <span className="percent">{score}%</span>
          &nbsp;-&nbsp;<span className="rating">{scoreRating}</span>
        </div>
      </div>
      <hr />
    </div>
  )
}
