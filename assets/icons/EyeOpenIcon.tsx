import React from 'react'
import Svg, { Path } from 'react-native-svg'

const EyeOpenIcon = ({ width = 16, height = 11, color = 'white' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 11" fill="none">
      <Path
        d="M1.69944 6.82549C3.03205 8.1503 5.35608 9.98664 8.00016 9.98664C10.6442 9.98664 12.9678 8.1503 14.3004 6.82549C14.6519 6.4761 14.8282 6.3008 14.9401 5.95775C15.02 5.71299 15.02 5.27373 14.9401 5.02897C14.8282 4.6859 14.6519 4.51058 14.3004 4.16115C12.9678 2.83635 10.6442 1 8.00016 1C5.35608 1 3.03205 2.83635 1.69944 4.16116C1.34771 4.51083 1.17184 4.68578 1.05988 5.02897C0.980039 5.27373 0.980039 5.71299 1.05988 5.95775C1.17184 6.30094 1.34771 6.47582 1.69944 6.82549Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.50224 5.49335C6.50224 6.32056 7.17282 6.99114 8.00002 6.99114C8.82723 6.99114 9.49781 6.32056 9.49781 5.49335C9.49781 4.66615 8.82723 3.99557 8.00002 3.99557C7.17282 3.99557 6.50224 4.66615 6.50224 5.49335Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EyeOpenIcon
