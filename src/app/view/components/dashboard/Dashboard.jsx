import React from 'react'
import {connect} from 'react-redux'
import {
  compose,
  withProps,
  withHandlers
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'
import R from 'ramda'

import {
  actions as recordActions,
  lens as recordLens
} from '../../../state/ducks/record'

import Progress from './Progress'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
`

const TodayTitle = styled.h4`
  margin-bottom: 0.5rem !important;
`

const ReadButton = styled.button`
  font-size: 1.2rem !important;
  display: block;
`

const ProgressContainer = styled.div`
  margin-top: 2rem
`

const Dashboard = (props) => {
  const {todayStr, onReadCommit, isCommitted} = props
  return (
    <Container>
      <TodayTitle className="title is-4">
        <i className="fa fa-bookmark-o"></i> {todayStr}
      </TodayTitle>
      <ReadButton className="button is-large is-primary"
        onClick={onReadCommit} disabled={isCommitted}>
        I Read At Least 2 Pages Today!
      </ReadButton>
      <ProgressContainer>
        <Progress />
      </ProgressContainer>
    </Container>
  )
}

const Dashboard_composed = compose(
  withProps(({readRecords = {}}) => {
    const today = moment()
    const todayKey = today.format('YYYY-MM-DD')
    return {
      date: today,
      todayStr: today.format('Do MMMM YYYY'),
      isCommitted: !!readRecords[todayKey]
    }
  }),
  withHandlers({
    onReadCommit: ({date, readCommit}) => (event) => {
      readCommit(date)
    }
  })
)(Dashboard)

function stateToProps(state) {
  const records = R.view(recordLens.recordsLens, state.record)
  return {
    readRecords: records
  }
}

const Dashboard_connected = connect(stateToProps, {
  readCommit: recordActions.readCommit
})(Dashboard_composed)

export default Dashboard_connected
