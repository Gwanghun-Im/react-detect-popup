import React, {
  FC,
  ReactNode,
  Fragment,
  useCallback,
  useState,
  useEffect,
} from "react"
import { useToast } from "./ui/useToast"
import {
  useDictionary,
  type KeywordStyle,
  ColorValue,
  CSSColorValue,
} from "../contexts/DictionaryContext"
import { cn } from "../lib/utils"

interface DetectPopConfig {
  defaultStyle?: KeywordStyle
  toastPosition?: "top" | "bottom"
  toastDuration?: number
}

interface TextSegment {
  type: "text" | "keyword"
  content: string
}

export const defaultStyle = {
  backgroundColor: "bg-blue-100",
  textColor: "text-blue-900",
  borderRadius: "rounded",
  padding: "px-1",
} as const

export function getColorClass(pre: "bg" | "text", color?: ColorValue): string {
  if (!color) return ""

  // CSSColorValue 타입 체크 (#, rgb, rgba로 시작하는지 확인)
  const isCSSColor = color.startsWith("#") || color.startsWith("rgb")

  return isCSSColor ? `${pre}-[${color}]` : `${pre}-${color}`
}

export const DetectPop: FC<{
  children: ReactNode
  config?: DetectPopConfig
  className?: string
}> = ({ children, config = {}, className }) => {
  const { dictionary } = useDictionary()
  const { toast } = useToast()
  const [processedText, setProcessedText] = useState<TextSegment[]>([])

  const { toastPosition = "bottom", toastDuration = 3000 } = config

  const handleKeywordClick = useCallback(
    (keyword: string) => {
      const definition = dictionary[keyword]
      if (definition) {
        toast({
          title: keyword,
          description: (
            <div className="space-y-2">
              <p>{definition.description}</p>
              {definition.examples && (
                <div className="text-sm">
                  <strong>예시:</strong> {definition.examples.join(", ")}
                </div>
              )}
              {definition.related && (
                <div className="text-sm">
                  <strong>관련 키워드:</strong> {definition.related.join(", ")}
                </div>
              )}
            </div>
          ),
          duration: toastDuration,
          position: toastPosition,
        })
      }
    },
    [dictionary, toast, toastDuration]
  )
  const processText = useCallback(() => {
    if (typeof children !== "string") {
      console.warn("DetectPop: children must be a string")
      return
    }

    // 키워드를 길이 순으로 정렬하여 긴 키워드부터 매칭 (예: "react native"가 "react"보다 먼저 매칭되도록)
    const keywords = Object.keys(dictionary).sort((a, b) => b.length - a.length)
    const segments: TextSegment[] = []
    let remainingText = children

    while (remainingText.length > 0) {
      let earliestIndex = remainingText.length
      let foundKeyword = ""

      // 모든 키워드에 대해 가장 먼저 나타나는 위치 찾기
      for (const keyword of keywords) {
        // 대소문자 구분 없이 검색
        const index = remainingText.toLowerCase().indexOf(keyword.toLowerCase())
        if (index !== -1 && index < earliestIndex) {
          earliestIndex = index
          // 원본 텍스트의 대소문자를 유지하기 위해 foundKeyword는 dictionary의 키워드 사용
          foundKeyword = keyword
        }
      }

      if (foundKeyword) {
        // 키워드 이전의 일반 텍스트 추가
        if (earliestIndex > 0) {
          segments.push({
            type: "text",
            content: remainingText.substring(0, earliestIndex),
          })
        }

        // 발견된 키워드를 원본 텍스트의 대소문자 유지하며 추가
        segments.push({
          type: "keyword",
          content: remainingText.substring(
            earliestIndex,
            earliestIndex + foundKeyword.length
          ),
        })

        // 처리된 부분을 제외한 나머지 텍스트로 업데이트
        remainingText = remainingText.substring(
          earliestIndex + foundKeyword.length
        )
      } else {
        // 더 이상 매칭되는 키워드가 없으면 남은 텍스트를 일반 텍스트로 추가
        segments.push({
          type: "text",
          content: remainingText,
        })
        break
      }
    }

    setProcessedText(segments)
  }, [children, dictionary])

  useEffect(() => {
    processText()
  }, [processText])

  if (typeof children !== "string") {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <div className={cn(className)}>
      {processedText.map((segment, index) => (
        <Fragment key={index}>
          {segment.type === "keyword" ? (
            <span
              className={cn(
                "cursor-pointer transition-colors hover:opacity-80",
                getColorClass(
                  "bg",
                  dictionary[segment.content]?.style?.backgroundColor
                ) || defaultStyle.backgroundColor,
                getColorClass(
                  "text",
                  dictionary[segment.content]?.style?.textColor
                ) || defaultStyle.textColor,
                dictionary[segment.content]?.style?.borderRadius
                  ? `rounded-${
                      dictionary[segment.content]?.style?.borderRadius
                    }`
                  : defaultStyle.borderRadius,
                dictionary[segment.content]?.style?.padding
                  ? `px-${dictionary[segment.content]?.style?.padding}`
                  : defaultStyle.padding
              )}
              onClick={() => handleKeywordClick(segment.content)}
            >
              {segment.content}
            </span>
          ) : (
            segment.content
          )}
        </Fragment>
      ))}
    </div>
  )
}
