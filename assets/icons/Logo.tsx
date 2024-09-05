import React from 'react'
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg'

const Logo = () => (
  <Svg
    width="241"
    height="120"
    viewBox="0 0 241 120"
    fill="none"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <Rect width="241" height="120" fill="url(#pattern0)" />
    <Defs>
      <Pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <Use
          xlinkHref="#image0"
          transform="matrix(0.000925926 0 0 0.00185837 0 -0.5)"
        />
      </Pattern>
      <Image
        id="image0"
        width="1080"
        height="1080"
        xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/..."
      />
    </Defs>
  </Svg>
)

export default Logo
