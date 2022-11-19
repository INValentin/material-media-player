import { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"

import { createTheme, ThemeProvider } from "@mui/material/styles"

import Header from "./components/Header"
import Player from "./components/Player"
import Playlist from "./components/Playlist"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import React from "react"
import MusicProvider from "./components/MusicProvider"

interface ToggleTheme {
  toggleTheme: () => void
}

const ToggleThemeContext = React.createContext<ToggleTheme>({} as ToggleTheme)

const ToggleThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLightMode, setIsLightMode] = useState(true)
  const theme = createTheme({ palette: { mode: isLightMode ? "light" : "dark" } })

  const themeToggle: ToggleTheme = {
    toggleTheme() {
      setIsLightMode(!isLightMode)
    },
  }

  return <ThemeProvider theme={theme}>
    <ToggleThemeContext.Provider value={themeToggle}>
      {children}
    </ToggleThemeContext.Provider>
  </ThemeProvider>
}

export const useToggleTheme = () => {
  return React.useContext(ToggleThemeContext)
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//   )
// )


// if (import.meta.hot) {
//   import.meta.hot.dispose(() => router.dispose());
// }

function App() {
  // const location = useLocation()
  useEffect(() => {
    window.document.title = "Media Player App"
  }, [])

  return (
    <ToggleThemeProvider>
      <MusicProvider>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Player />} />
              <Route path="playlist" element={<Playlist />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </ToggleThemeProvider>
  )
}



export default App
