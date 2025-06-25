import React, { useState } from 'react'
import Calendar from './components/Calendar'
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar App</h1>
            <p className="text-gray-600">Manage your schedule with style</p>
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
}