# react-detect-popup

텍스트 내의 키워드를 감지하여 팝업으로 설명을 표시하는 React 컴포넌트

[![npm version](https://img.shields.io/npm/v/react-detect-popup.svg)](https://www.npmjs.com/package/react-detect-popup)
[![npm downloads](https://img.shields.io/npm/dm/react-detect-popup.svg)](https://www.npmjs.com/package/react-detect-popup)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Gwanghun-Im/react-detect-popup)](https://github.com/Gwanghun-Im/react-detect-popup/stargazers)
[![hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FGwanghun-Im%2Freact-detect-popup&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## 설치

```bash
npm install react-detect-popup
# or
yarn add react-detect-popup
```

## 사용법

👇 Check out the demo in the website below
[gwanghun.im](https://www.gwanghun.im/tools/react-detect-popup)

```tsx
import { DetectPop, DictionaryProvider, Toaster } from "react-detect-popup"

function App() {
  return (
    <DictionaryProvider
      initial={{
        react: {
          description: "프론트엔드 라이브러리",
          examples: ["React Hooks", "Components"],
          category: "프레임워크",
          related: ["Vue", "Angular"],
        },
      }}
    >
      <DetectPop>react는 매우 강력한 도구입니다.</DetectPop>
      <Toaster />
    </DictionaryProvider>
  )
}
```

## 컴포넌트

### DictionaryProvider

전역적으로 사전 데이터를 관리하는 컨텍스트 프로바이더입니다.

#### Props

- `initial`: Dictionary - 초기 사전 데이터

```typescript
interface Dictionary {
  [key: string]: {
    description: string
    examples?: string[]
    category?: string
    related?: string[]
    style?: KeywordStyle
  }
}
```

### DetectPop

키워드를 감지하고 팝업을 표시하는 컴포넌트입니다.

#### Props

- `children`: string - 검사할 텍스트
- `config`: DetectPopConfig - 설정 옵션
- `className`: string - 추가 스타일링을 위한 클래스

```typescript
interface DetectPopConfig {
  defaultStyle?: KeywordStyle
  toastPosition?: "top" | "bottom"
  toastDuration?: number
}

interface KeywordStyle {
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
}
```

### Toaster

토스트 알림을 표시하는 컴포넌트입니다. 앱의 최상위 레벨에 한 번만 추가하면 됩니다.

## 스타일링

이 패키지는 Tailwind CSS를 사용합니다. 사용자의 프로젝트에 Tailwind CSS가 설치되어 있어야 합니다.

## 요구사항

- React 16.8.0 이상
- React DOM 16.8.0 이상
- Tailwind CSS 3.0.0 이상

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
