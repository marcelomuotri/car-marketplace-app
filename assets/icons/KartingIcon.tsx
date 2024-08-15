import React from 'react'
import { Image, View } from 'react-native'

const KartingIcon = ({ width = 29, height = 28 }) => {
  return (
    <View style={{ width, height, overflow: 'hidden', borderRadius: 5 }}>
      <Image
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKHElEQVR4nO1cfYxcVRV/rSJ+K4ooahU1YqiGmKxCu3PvjFHR+hHQaBO/NSa0lHbeObOLVKTJRDF+pkiF7rt3pqSm6B+tH5WCYCPGmGhMjDG0ZUGggBVBxLa2dLGWWtacN292551738fMzuwsM/eXvKTZue++e9655+P+znn1PAcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB4ehQbGGUmrcLzT8o6grn+r3eoYaBe2/Tmj4l9Q43bjgVFHDxf1e13Bi2lskNP52VhnRpeAJUffP7/fyhg4FDV80lDGrlL+WbrjiVf1e49BgRK86TWh8KFEhoVLwTyN61fP7vdahgKzBF+IKgFNCwy+4UoSC7eTa+r3egYfUeEfsxWsIVu5Y+Syp8DZDKRq+1u/1DjTExJozpManWlzT07K27g302wWbyi8WGvcx1/W0UP5n+r3uZzRW0m7fPLbE5m6Eho/E3RL+sfX3UgDnCIWPxa0E/ysCLMyrEIMCURs7V2i8r/mySzdc/sLY7wrWszhxHZ+jUKssEwqOM0t5XEzgG+dVmEFQhlT4CNvdn42N0fBNppAx61y68onQncVjyuR79fqXzJtAg6YMqXG6oOEDsXEar2n9vagr44lzKqxagvzuUrX67HkRatCUIRXWjLG6cjkbd1P6aR5+ZDmnTPRapoFThtBQ96rVxXx8UfvvZGOPjm750ouS5i9trT5XKPw9n7+oEXou3KArYyYD03iAUSXXeilYPjF+Fj/ZC4X/kxo/lHbfUEF0oIwmpIarjJN6zf9w2j2FGr6VrMkRke0oQ+G/xY3lV3gZWLax8jwLl3U4K60VqrJCaDjJ7jsw1ESkSArgs7v9zpIeOzNrnoL2RezE3ryXnVs4pPbXWTbC3XTgHDreS2QqYya72pPHUugMYlHoLooz6ffh9UmbYWjiikhObW/kZGEUS/ZmKmXaWyQ1/Ni8F7+XdhudQ6SG21Os9PbRCXiLN6hYPjF+VloAp5ggFfzK8mL30b1pc1PKG+1s9lL9dWn3Ua1Eavg+8Vw2pYT8l4L1Wdb2jIRUsCErm2oEathtWhDcdWHdf2Xq/JvHlggNj/LMS2r/Y5lr03i2UPBdqeE/dvcJf1i+Zfz13iBBKrwsT2obHeJ+aXkxk1lKGVX4DqnxyXiwhuMU/HOtcfPYEqlgm4X/Ims5KDW+zxsULN1RfY7UuInKqkLjlWnnDFKKzb9TJpSVnlKmFB34Wnf4IWoVKm2Fl+ZZayGAdzXZZn6QJNrGG0aUSCn26t895GLasUZ2/xGh4NcNgrI8mrQxwpimQSfElmu8hYRi4F9E/prMuBDA53r1nBWbyqcLDbdaXspfspRCZdvM1Do6FBIjnJTNiQA+aYstVALousBEJVB6SEFTKJiii/5NvJAIyktThL0nRln0sDy6YlP5dKnwFptSRresfXUGy1vPqRSKNVNS47dsJKXQcCGvQEaucEPX/DkdjAxfy/2lguuo3YbfTwGW7ZaTMsBLurK4xPgDuywv5N5lQeU1XhKmvUVkwUS1RxT8b6LgnKIc+LsteBcD/81C4cPx51MtHz/tzVk4S76f4nN3c6XIGr5bKjjBsxn6+5wWl72Jbrb48/tKtfJrvTZQmvDfJhR+xRa4m5sx3P2MRhnV5TdFCovLHVQu8DpFMmWQas5GzZrye0s288ScFpcvU9tpWd/97SolRLW6mNytQeXPWssu3mg3WoO3h3LGN8VDHZWFw5hhuqlJak4m3xmeeAO8hNJL7pKKdTjP2srJc3YFh2gHej3CiF51mlTwM8sL3B92qXSAiCXYYBKVDQ9Bcax1PNH8XG6h4IdtPzgM4EwZ1MfEx5G244E7vDYmzFmxCPEombfX2zbSn1p29APUDd/pvFJBkT5psMjzc8NtK/i2MS6jHuNlBeO0QFyoVT7KzHJfsiD4VYsffjA1C+qGpdhIRYUPzoXmoCRBaPhzVg2eyElzHDxA1pb7Ydz3pdWhyXJ4fEidm07hphCTeeoanaLB2OIOm1I6iinNefXYmUb3Y8NSVraOE3V/xAwBcFXq5GFGpHGnSbwN2aVCn/8kfaZAh01ytWkWTBQNjWUKOcIrktRTzDbuIVsYaNQJFFxrI8rchc2Xd0Jo+EESP0YHQiO913CrhSmeYmOutk12tXvxmNN64FBYvrV5GI1XGONr8H42ZiOzxkdijXhkVrYUzl04nc5M4CprnFK4hynwrlZSkpII3jghAvx4i3Xgd+ImhMfCjIoxm1Q7tnP/sJd8LH2nR/4wbPGv++dT/doW7GiOYuB/sHXuZfXKy2geOQ8dg9RJYnfNcKdQWKYz1EXbxl9AF3F0QoNvvOTG+FNcjvA9KShmtbfyAyt9PNTyIytnKkB7ehfndcJSpsLL0moVVM6kmgAve9JcPEiSbxYK7rfsxm/MRQHsRZwtNfwzPj8cFzW4NLW3q1pdLDWstpRvD9tiilHzV3hb2jEhjE8Ta86wpre2Eyzn+sP6sa6U8r6IqIjDlAIBH1cK4BzO/0TPu9LrAsjiuDJoR+e9n2Q25FCosj8wpca8sXMZrRNrwpspTXDh+eSUo5vkoOk/cwgTb3pWcMLGvhbrcF78W/LmV03tP9NonGC1itAy2pYD1rCNdbLZWNGgVfDrtphMVhGfx2APbsqlEPKr7OXsMeILNQ0o/ElobQ2L22m0xRA5Z34+ttYqdN0fMdo4537F6ufkqjuXIx7vKEuljpOU89uBGZfUlLEGl7JN/nA+hbCvVUlBXAhKBS2LOMzdH3WQM4XcYlNI0z0kdnZ04eqqHKnPge1cGaF8QXkpH0suO4eFxAMtZ3LDHZW8oB1pi6AaA3+ekdn1KCXvphxWRTTc7ue9JDQs7UjsPspusy0Ej8W0yHphjaQgfh01m9RiCjnmZaCo4WKh4W/dVkg35WAWMUVMOaXyWbJJDb+L3U+FrhwWMtWpILQD5qqQbqGXckSyUHz8cp4e49k14VamkG0e99O8FZNo4jRTt1XlWnbLdss3F61j9nvzBNlDOagK2KUOzTvoj/emBjvWMEAn19bfKQsJA5+5Yw5yWpsOnexZN3ciSCfoqRyMRMwLS6Z1N02+mbuRMGeOUsKQOsiR9ka1BkpVj9KO4kI0Tu3xtJcrv5fopRw2diMPKIiz9/FYZH7UaNxOUITV7b8Q42vYBXDBQpPjqJVgzLq6QZ0shEssPDmeCh8U/c84tfaFgTWdkIsL6RILSA5K72MPJjo5PJkrfLyNSfbSyZVcH1HWlE6GblABWun3BXqJPstByqDSgNcO6P8RmcvJOSzsdEDodRuDIkdL45eV88nYAXjQVtDpF8SAyBHiPdevfTnVMyzfcNtMkcZM5KES5huDIscMiCag1DH6BGCymb+H/w7/Bqt72WvVLQyKHA4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg6egf8DAmpOVpV83GYAAAAASUVORK5CYII=',
        }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  )
}

export default KartingIcon
