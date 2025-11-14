import { createContext, useState, useContext } from "react"

const ConfigContext = createContext()

export const ConfigProvider = ( {children} ) => {
    const [category, setCategory] = useState(null)
    const [size, setSize] = useState(null)
    const [decade, setDecade] = useState(null)
    const [genre, setGenre] = useState(null)

    const resetConfig = () => {
        setCategory(null)
        setSize(null)
        setDecade(null)
        setGenre(null)
    }

    const value = {
        category, setCategory,
        size, setSize,
        decade, setDecade,
        genre, setGenre,
        resetConfig
    }

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    )
}

export const useConfigContext = () => useContext(ConfigContext)
