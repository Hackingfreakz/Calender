import React, { useState } from 'react'
import Calendar from './components/Calendar'
export default function App() {
  return (
  <>
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
	  <Calendar />
      </div>
    </div>
  </>
  );
}