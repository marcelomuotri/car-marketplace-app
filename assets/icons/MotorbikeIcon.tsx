import React from 'react'
import Svg, { Rect, Defs, Pattern, Image } from 'react-native-svg'

const MotorbikeIcon = () => {
  return (
    <Svg width="30" height="30" viewBox="0 0 31 30" fill="none">
      <Rect x="0.5" width="30" height="30" fill="url(#pattern0_621_5299)" />
      <Defs>
        <Pattern
          id="pattern0_621_5299"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <Image
            href="data:image/png;base64,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"
            transform="scale(0.0125)"
          />
        </Pattern>
      </Defs>
    </Svg>
  )
}

export default MotorbikeIcon
