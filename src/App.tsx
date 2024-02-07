import { Route, Routes } from 'react-router-dom';
import InputPage from './pages/InputPage';
import PreviewPage from './pages/PreviewPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </>
  )
}

export default App
