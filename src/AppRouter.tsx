import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Hotels = React.lazy( () => import( './pages/Hotels' ) )

const Loading = () => <p>Loading…</p>

const AppRouter = () => {
  return (
    <React.Suspense fallback={<Loading /> }>
      <Routes>
        <Route path='/' element={<Hotels />} />
      </Routes>
    </React.Suspense>
  )
}

export default AppRouter

