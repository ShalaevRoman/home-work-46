import { UserProfile } from './components/UserProfile'
import './App.css'

function App() {
  return (
    <main>
      <h1>Профіль користувача</h1>
      <UserProfile userId={1} />
    </main>
  )
}

export default App