import React from 'react'
import {
  compose,
  withProps,
  shouldUpdate
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

import {green, purple} from '../../base/colors'

const Container = styled.div`
  display: flex;
`

const Check = styled.span`
  margin-right: 1rem;
  color: ${green['A400']}
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Pages = styled.span`
  font-weight: bold;
  color: ${purple['300']}
`

const ProgressItem = (props) => {
  const {dateText, books} = props
  return (
    <Container>
      <Check>
        <i className="fa fa-check-circle-o"></i>
      </Check>
      <InfoContainer>
        <strong>{dateText}</strong>
        {books.map(book => (
          <div key={book.title}>
            <Pages>{book.pages}</Pages>
            &nbsp;on&nbsp;{book.title}
          </div>
        ))}
      </InfoContainer>
    </Container>
  )
}
const ProgressItem_composed = compose(
  // shouldUpdate((current, next) => {
  //   const currentRecord = current.record
  //   const nextRecord = next.record
  //   return currentRecord.date !== nextRecord.date ||
  //     currentRecord.read !== nextRecord.read
  // }),
  withProps(({record}) => {
    return {
      dateText: moment(record.date, 'YYYY-MM-DD').format('Do MMMM YYYY'),
      books: record.books || []
    }
  })
)(ProgressItem)

export default ProgressItem_composed
