import React from 'react'
import Svg, { Path } from 'react-native-svg'

const FavoriteIcon = ({
  color,
  filled,
}: {
  color: string
  filled: boolean
}) => {
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
        d="M13.7215 24.3294C11.1891 22.7709 8.83329 20.9366 6.69616 18.8594C5.19367 17.3634 4.04983 15.5397 3.35227 13.528C2.09699 9.62536 3.56324 5.15763 7.66663 3.83544C9.82321 3.14117 12.1785 3.53798 13.9958 4.90172C15.8137 3.53964 18.1682 3.14297 20.3249 3.83544C24.4283 5.15763 25.9051 9.62536 24.6498 13.528C23.9522 15.5397 22.8084 17.3634 21.3059 18.8594C19.1688 20.9366 16.813 22.7709 14.2806 24.3294L14.0063 24.5L13.7215 24.3294Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'} // Fill only when selected
      />
      <Path
        d="M18.3633 8.22852C19.6061 8.62553 20.4892 9.74133 20.5996 11.0542"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FavoriteIcon
