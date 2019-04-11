import PropTypes from 'prop-types'
import React from 'react'

import './Card.css'

const HIDDEN_SYMBOL = '❓'

// Card est un composant fonctionnel qui retourne du JSX. C'est la classe App quiva le renderer.
// En React, une fonction est un composant lorsqu'elle return du JSX.
// Si une fonction ne retourne aucun JSX, c'est simplement une fonction.
const Card = ({ card, feedback, index, handleClick }) => (
  <div className={`card ${feedback}`} onClick={() => handleClick(index)}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

Card.propTypes = {
  card: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'justMatched',
    'justMismatched',
    'visible',
  ]).isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Card
