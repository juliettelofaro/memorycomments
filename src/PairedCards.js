import PropTypes from 'prop-types'
import React from 'react'

const PairedCards = ({ pairSymbols }) => (
    <div>{ pairSymbols }</div>
)

PairedCards.propTypes = {
    pairSymbols : PropTypes.string.isRequired,
}

export default PairedCards