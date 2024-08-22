import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div>Profile Page - {params.id}</div>
  )
}

export default UserProfile