import BottomNav from '@/components/MobileNav'
import React from 'react'

const index = () => {
  return (
    <div>
      <BottomNav role={localStorage.getItem("role")} />
    </div>
  )
}

export default index
