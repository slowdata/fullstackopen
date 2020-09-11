import React from 'react'

const divStyle = {
  border: '1.5px',
  borderStyle: 'solid',
  borderRadius: 5,
  height: '2.5rem',
  backgroundColor: 'lightgray',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '1rem',
}

const Notification = ({ children, type }) => {
  const color = type === 'error' ? 'red' : 'green'
  const styles = { ...divStyle, color }

  return <div style={styles}>{children}</div>
}

export default Notification
