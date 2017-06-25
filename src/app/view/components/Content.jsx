import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {lens as routingLens} from '../../state/ducks/routing'

import Profile from './profile'
import Dashboard from './dashboard'
import EditRecordForm from './editRecord'
import History from './history'
import BottomBar from './BottomBar'

const Container = styled.section`
  flex: 1;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: stretch;
`

const Content = (props) => {
  const {view} = props
  return (
    <Container>
      {view}
      <BottomBar />
    </Container>
  )
}

function stateToProps(state) {
  const stateName = R.view(routingLens.currentStateNameLens, state.routing)
  switch (stateName) {
    case 'dashboard':
      return {state: stateName, view: <Dashboard />}
    case 'profile':
      return {state: stateName, view: <Profile />}
    case 'record.edit':
      return {state: stateName, view: <EditRecordForm />}
    case 'history':
      return {state: stateName, view: <History />}
    default:
      return {state: stateName}
  }
}

const Content_connected = connect(stateToProps)(Content)

export default Content_connected
