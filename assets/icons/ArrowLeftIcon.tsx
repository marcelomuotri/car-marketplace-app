import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { View } from 'react-native'

interface ArrowLeftProps {
  color?: string // Propiedad opcional para cambiar el color
}

const ArrowLeftIcon: React.FC<ArrowLeftProps> = ({ color = 'white' }) => {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M4.25 12.2739L19.25 12.2739"
          stroke={color} // Usamos el color que viene como prop
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.2998 18.2985L4.2498 12.2745L10.2998 6.24951"
          stroke={color} // Usamos el color que viene como prop
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  )
}

export default ArrowLeftIcon
