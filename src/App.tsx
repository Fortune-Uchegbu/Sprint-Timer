import { BrowserRouter } from 'react-router-dom';
import Main from './AppMain'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
