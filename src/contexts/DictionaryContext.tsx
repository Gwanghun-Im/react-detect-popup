import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  FC,
  ReactNode,
} from "react"

// Types
export interface KeywordDefinition {
  description: string
  category?: string
  examples?: string[]
  related?: string[]
  style?: KeywordStyle
}
// Tailwind 기본 색상 타입
export type TailwindColor =
  | "white"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone" // 그레이 계열
  | "red"
  | "orange"
  | "amber"
  | "yellow" // 난색
  | "lime"
  | "green"
  | "emerald"
  | "teal" // 녹색 계열
  | "cyan"
  | "sky"
  | "blue"
  | "indigo" // 청색 계열
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose" // 보라/분홍 계열

// Tailwind 음영 타입 (null 허용)
export type TailwindShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | null

// CSS 색상 값 타입
export type CSSColorValue =
  | `#${string}`
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`

// 색상 타입 (Tailwind 또는 커스텀)
export type ColorValue =
  | TailwindColor
  | `${TailwindColor}${TailwindShade extends null ? "" : `-${TailwindShade}`}`
  | CSSColorValue

// 통합된 스타일 타입
export interface KeywordStyle {
  backgroundColor?: ColorValue
  textColor?: ColorValue
  borderRadius?: "none" | "sm" | "md" | "lg" | "full"
  padding?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8"
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
