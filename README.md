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

## API

### DictionaryProvider

전역적으로 사전 데이터를 관리하는 컨텍스트 프로바이더입니다.

### DetectPop

키워드를 감지하고 팝업을 표시하는 컴포넌트입니다.

#### Props

- `children`: string - 검사할 텍스트
- `config`: DetectPopConfig - 설정 옵션
- `className`: string - 추가 스타일링을 위한 클래스

...
