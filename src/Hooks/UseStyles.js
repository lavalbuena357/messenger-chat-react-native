import { useMemo } from "react"
import { useSelector } from "react-redux"

import Theme from "../colors/colors"

const useStyles = (getStyles) => {
  const theme = useSelector(state => state.themeReducer.theme)
  const { colors } = Theme[theme]

  const styles = useMemo(() => getStyles({colors}), [colors])

  return styles
}

export default useStyles