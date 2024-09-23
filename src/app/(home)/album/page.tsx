import React from 'react'
import Background from './background'
import Text from './text'
import Album from './Grid'
import Footer from '@components/footer/Footer'

export default function page() {
  return (
    <div>
        <Background></Background>
        <Text></Text>
        <Album></Album>
    </div>
  )
}
