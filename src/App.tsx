import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import NowPage from '@/pages/NowPage'
import TimePage from '@/pages/TimePage'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path=":tz/now" element={<NowPage />} />
          <Route path=":tz/:time" element={<TimePage />} />
          <Route path=":continent/:city/now" element={<NowPage />} />
          <Route path=":continent/:city/:time" element={<TimePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
