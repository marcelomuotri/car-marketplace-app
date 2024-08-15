import React from 'react'
import Svg, { Path } from 'react-native-svg'

const ArrowDownIcon = ({ width = 12, height = 12, color = '#200E32' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M9.5 4.25L6 7.75L2.5 4.25"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ArrowDownIcon
