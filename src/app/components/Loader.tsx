'use client'

import React from 'react'
import './loader.css'

export default function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-leetcode-dark">
      <div className="absolute inset-0 backdrop-blur-md"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="loader scale-50">
          <div className="box box0">
            <div></div>
          </div>
          <div className="box box1">
            <div></div>
          </div>
          <div className="box box2">
            <div></div>
          </div>
          <div className="box box3">
            <div></div>
          </div>
          <div className="box box4">
            <div></div>
          </div>
          <div className="box box5">
            <div></div>
          </div>
          <div className="box box6">
            <div></div>
          </div>
          <div className="box box7">
            <div></div>
          </div>
          <div className="ground">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

