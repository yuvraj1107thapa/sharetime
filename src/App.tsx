import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import NowPage from '@/pages/NowPage'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path=":tz/now" element={<NowPage />} />
          <Route path=":continent/:city/now" element={<NowPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
