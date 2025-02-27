import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DetectPop } from "../components/DetectPop"
import { Toaster } from "../components/ui/Toaster"
import { DictionaryProvider } from "../contexts/DictionaryContext"
import { ToastProvider } from "../components/ui/Toast/index"

const meta: Meta<typeof DetectPop> = {
  title: "Components/DetectPop",
  component: DetectPop,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <DictionaryProvider
          initial={{
            리액트: {
              description:
                "프론트엔드 개발을 위한 JavaScript 라이브러리입니다.",
              category: "프레임워크",
              examples: ["React Hooks", "React Components"],
              related: ["Next.js", "React Native"],
            },
            "Next.js": {
              description: "React 기반의 풀스택 웹 프레임워크입니다.",
              category: "프레임워크",
              examples: ["Pages Router", "App Router"],
              style: {
                backgroundColor: "black-100",
                textColor: "white",
              },
            },
          }}
        >
          <Story />
        </DictionaryProvider>
        <Toaster />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DetectPop>

// 기본 사용 예시
export const Basic: Story = {
  args: {
    children: "리액트와 Next.js로 웹 개발하기",
  },
}

// 커스텀 스타일 설정
export const CustomStyle: Story = {
  args: {
    children: "리액트로 개발하기",
    config: {
      defaultStyle: {
        backgroundColor: "blue-500",
        textColor: "white",
        borderRadius: "lg",
        padding: "2",
      },
    },
  },
}

// 토스트 위치 변경
export const TopToast: Story = {
  args: {
    children: "리액트로 개발하기",
    config: {
      toastPosition: "top",
      toastDuration: 5000,
    },
  },
}
