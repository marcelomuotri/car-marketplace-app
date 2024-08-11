import React from 'react'
import Svg, { Rect, Defs, Pattern, Image } from 'react-native-svg'

const ToolsIcon = () => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Rect x="0.5" width="24" height="24" fill="url(#pattern0_664_5771)" />
      <Defs>
        <Pattern
          id="pattern0_664_5771"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <Image
            href="data:image/png;base64,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"
            transform="scale(0.02)"
          />
        </Pattern>
      </Defs>
    </Svg>
  )
}

export default ToolsIcon
