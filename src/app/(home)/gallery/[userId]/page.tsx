import React from 'react'
import Gallery from '../Gallery'

export default function page({params}:{params:{userId:string}}) {

  const { userId } = params;
  const id = parseInt(userId);

  return (
    <div>
    <Gallery userId={id}></Gallery>
    </div>
  )
}
