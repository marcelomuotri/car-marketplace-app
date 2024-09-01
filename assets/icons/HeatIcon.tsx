import React from 'react'
import Svg, { Path } from 'react-native-svg'

const HeartIcon = ({ color = 'none' }) => {
  return (
    <Svg width="23" height="23" viewBox="0 0 23 23" fill={color}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2711 19.9849C9.19096 18.7046 7.25581 17.1979 5.50032 15.4916C4.26612 14.2628 3.32654 12.7648 2.75355 11.1122C1.72243 7.90654 2.92684 4.23663 6.29749 3.15054C8.06896 2.58025 10.0037 2.9062 11.4964 4.02642C12.9897 2.90756 14.9238 2.58173 16.6954 3.15054C20.066 4.23663 21.2791 7.90654 20.248 11.1122C19.675 12.7648 18.7354 14.2628 17.5012 15.4916C15.7457 17.1979 13.8105 18.7046 11.7304 19.9849L11.5051 20.125L11.2711 19.9849Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.0835 6.75903C16.1044 7.08515 16.8298 8.00171 16.9205 9.0801"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HeartIcon
