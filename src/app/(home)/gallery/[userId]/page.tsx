import React from 'react'
import Gallery from '../Gallery'

export default function page({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <div>
      <Gallery userId={userId} />
    </div>
  );
}
