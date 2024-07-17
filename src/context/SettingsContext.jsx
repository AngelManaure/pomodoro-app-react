import { createContext, useContext, useState } from "react"

export const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useSettings debería estar dentro de un SettingsProvider.")
    } else {
        return context
    }
}

export const SettingsProvider = ({ children }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [isPaused, setIsPaused] = useState(false); 
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(45);

    const settingsOnClick = () => {
        if (showSettings === false) {
          setShowSettings(true)
        } else {
          setShowSettings(false)
        }
      }

    //   const playOrPause = () => {
    //     if (isPaused === false) {
    //         setIsPaused(true)
    //       } else {
    //         setIsPaused(false)
    //       }
    //     }

    return (
        <SettingsContext.Provider
            value={{
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
                showSettings,
                setShowSettings,
                settingsOnClick,
                isPaused,
                setIsPaused,
                // playOrPause,
            }}
        >
        { children }
        </SettingsContext.Provider>
    )
}