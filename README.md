# react-detect-popup

텍스트 내의 키워드를 감지하여 팝업으로 설명을 표시하는 React 컴포넌트

## 설치

```bash
npm install react-detect-popup
or
yarn add react-detect-popup
```

## 사용법

```tsx
jsx
import { DetectPop, DictionaryProvider } from "react-detect-popup"
function App() {
  return (
    <DictionaryProvider
      initial={{
        react: {
          description: "프론트엔드 라이브러리",
          examples: ["React Hooks", "Components"],
        },
      }}
    >
      <DetectPop>react는 매우 강력한 도구입니다.</DetectPop>
    </DictionaryProvider>
  )
}
```
