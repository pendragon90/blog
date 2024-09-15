import React from 'react'
import { Container, Paper, Title } from '@mantine/core'
import SideNavSettings from '@/Components/SideNavSettings'

function SettingsLayout({ children, page }) {
  return (
    <>
      <Container size="responsive">
        <SideNavSettings />

        <main className="lg:ml-64" style={{maxWidth:'50%'}}>
        <Container>

  
<Paper mt='md'>
<Title order={2} ta="start" className='pb-10'>
  {page} Page
</Title>
{children}
</Paper>
</Container>
            </main>
      </Container>
    </>
  )
}

export default SettingsLayout
