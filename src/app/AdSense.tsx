import Script from 'next/script'
import React from 'react'

export default function AdSense() {
  return (
    <div>
      <Script 
       async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7252077512047028"
     crossOrigin="anonymous"
     strategy='afterInteractive'
      />
    </div>
  )
}
