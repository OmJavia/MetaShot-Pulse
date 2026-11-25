import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './responsive.css'
import './mobile-lab.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
