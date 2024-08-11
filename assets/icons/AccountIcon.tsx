import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

const AccountIcon = ({ color, filled }: { color: string; filled: boolean }) => {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx="13.5089"
        cy="8.49112"
        r="5.57437"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'} // Fill only when selected
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.66701 21.8182C4.66551 21.4264 4.75315 21.0393 4.9233 20.6863C5.45725 19.6184 6.96297 19.0524 8.2124 18.7961C9.11348 18.6038 10.027 18.4754 10.9462 18.4117C12.648 18.2622 14.3596 18.2622 16.0614 18.4117C16.9805 18.4761 17.8939 18.6045 18.7952 18.7961C20.0446 19.0524 21.5503 19.565 22.0843 20.6863C22.4264 21.4059 22.4264 22.2413 22.0843 22.9609C21.5503 24.0822 20.0446 24.5947 18.7952 24.8404C17.8951 25.0406 16.9813 25.1727 16.0614 25.2355C14.6763 25.3529 13.2847 25.3743 11.8966 25.2995C11.5762 25.2995 11.2666 25.2995 10.9462 25.2355C10.0297 25.1735 9.11936 25.0414 8.22308 24.8404C6.96297 24.5947 5.46793 24.0822 4.9233 22.9609C4.75402 22.6038 4.66647 22.2134 4.66701 21.8182Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'} // Fill only when selected
      />
    </Svg>
  )
}

export default AccountIcon
