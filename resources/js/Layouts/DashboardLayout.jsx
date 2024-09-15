import React from 'react'
import { Container } from '@mantine/core'
import SideNavDashboard from '@/Components/SideNavDashboard'

function DashboardLayout({ children }) {
  return (
    <>
      <Container size="responsive">
        <SideNavDashboard />

        <main className="lg:ml-64 lg:mt-16 mt-10">{children}</main>
      </Container>
    </>
  )
}

export default DashboardLayout
