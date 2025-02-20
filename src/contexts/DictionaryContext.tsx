import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  FC,
  ReactNode,
} from "react"

// Types
interface KeywordDefinition {
  description: string
  category?: string
  examples?: string[]
  related?: string[]
  style?: KeywordStyle
}

interface KeywordStyle {
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
}

const DictionaryContext = createContext<{
  dictionary: Record<string, KeywordDefinition>
  addKeyword: (key: string, definition: KeywordDefinition) => void
  removeKeyword: (key: string) => void
  updateKeyword: (key: string, definition: Partial<KeywordDefinition>) => void
}>({
  dictionary: {},
  addKeyword: () => {},
  removeKeyword: () => {},
  updateKeyword: () => {},
})

export const DictionaryProvider: FC<{
  children: ReactNode
  initial?: Record<string, KeywordDefinition>
}> = ({ children, initial = {} }) => {
  const [dictionary, setDictionary] = useState(initial)

  const addKeyword = useCallback(
    (key: string, definition: KeywordDefinition) => {
      setDictionary((prev) => ({ ...prev, [key]: definition }))
    },
    []
  )

  const removeKeyword = useCallback((key: string) => {
    setDictionary((prev) => {
      const newDict = { ...prev }
      delete newDict[key]
      return newDict
    })
  }, [])

  const updateKeyword = useCallback(
    (key: string, definition: Partial<KeywordDefinition>) => {
      setDictionary((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...definition },
      }))
    },
    []
  )

  return (
    <DictionaryContext.Provider
      value={{ dictionary, addKeyword, removeKeyword, updateKeyword }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider")
  }
  return context
}

export type { KeywordDefinition, KeywordStyle }
