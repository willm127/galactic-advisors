import { useState } from 'react'
import { format } from 'date-fns'

import logo from '../../assets/logo.png'

export default function Header() {
  const [conductedDate, setConductedDate] = useState(null)
  const [acceptedDate, setAcceptedDate] = useState(null)
  const [name, setName] = useState('')

  const handleDate = (d, callback) => {
    const thisDate = new Date(d.target.valueAsNumber)
    thisDate.setDate(thisDate.getDate() + 1)

    const formattedDate = format(thisDate, 'M-d-u')
    callback(formattedDate)
  }

  return (
    <div className="header">
      <div className="titles">
        <div>
          <h2>Insurance Assessment</h2>
          <h1>Client Name</h1>
        </div>
        <div>
          <img className="logo" src={logo} alt="Galactic Advisors Logo" />
        </div>
      </div>
      <div className="header-info">
        <div className="info-data">
          <div className="info-row">
            <div className="info-label">Conducted on:</div>
            <span className="print-hide">
              <input
                type="date"
                onChange={(e) => handleDate(e, setConductedDate)}
              />
            </span>
            {conductedDate && (
              <span className="desktop-hide">{conductedDate}</span>
            )}
          </div>
          <div className="info-row">
            <div className="info-label">Date Accepted: </div>
            <span className="print-hide">
              <input
                type="date"
                onChange={(e) => handleDate(e, setAcceptedDate)}
              />
            </span>
            {conductedDate && (
              <span className="desktop-hide">{acceptedDate}</span>
            )}
          </div>
          <div className="info-row">
            <div className="info-label">Reviewer Name:</div>
            <span className="print-hide">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            {name && <span className="desktop-hide">{name}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
