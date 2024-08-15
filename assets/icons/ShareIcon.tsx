import React from 'react'
import { Svg, Rect, Defs, Pattern, Image, Use } from 'react-native-svg'

const ShareIcon = () => {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <Rect width="21" height="21" fill="url(#pattern0_616_5099)" />
      <Defs>
        <Pattern
          id="pattern0_616_5099"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <Use href="#image0_616_5099" transform="scale(0.0104167)" />
        </Pattern>
        <Image
          id="image0_616_5099"
          width="96"
          height="96"
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  )
}

export default ShareIcon
