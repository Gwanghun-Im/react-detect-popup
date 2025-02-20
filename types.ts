export interface KeywordDefinition {
  description: string
  category?: string
  examples?: string[]
  related?: string[]
  style?: KeywordStyle
}

export interface KeywordStyle {
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
}
