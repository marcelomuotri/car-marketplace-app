import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SupportIcon = ({ color, filled }: { color: string; filled: boolean }) => {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1928 3.22217H9.43101C7.02884 3.22217 4.95801 5.16933 4.95801 7.57267V20.0712C4.95801 22.6098 6.89351 24.634 9.43101 24.634H18.7515C21.1548 24.634 23.102 22.4757 23.102 20.0712V9.3775L17.1928 3.22217Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'} // Fill only when selected
      />
      <Path
        d="M16.8867 3.2085V6.60233C16.8867 8.259 18.2272 9.603 19.8827 9.6065C21.4192 9.61 22.9907 9.61116 23.0969 9.60416"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6647 18.1507H10.3682"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.2825 12.3731H10.3672"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SupportIcon
