import React from 'react'
import Svg, { Path } from 'react-native-svg'

const CloseIcon = ({ width = 24, height = 24, color = '#2E3A59' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill={color}
    />
  </Svg>
)

export default CloseIcon
