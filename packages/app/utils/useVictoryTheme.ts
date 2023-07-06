import { getVariable, useTheme } from '@my/ui'
import { assign } from 'lodash'
import { VictoryThemeDefinition } from 'victory'

export const useVictoryTheme = (): VictoryThemeDefinition => {
  const theme = useTheme()

  // *
  // * Typography
  // *
  const letterSpacing = 'normal'
  const fontSize = 12
  // *
  // * Layout
  // *
  const padding = 8
  const baseProps = {
    width: 350,
    height: 350,
    padding: 50,
  }
  // *
  // * Labels
  // *
  const baseLabelStyles = {
    // fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding,
    fill: getVariable(theme.color),
    stroke: 'transparent',
    strokeWidth: 0,
  }

  const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles)
  // *
  // * Strokes
  // *
  const strokeDasharray = '10, 5'
  const strokeLinecap = 'round'
  const strokeLinejoin = 'round'

  // *
  // * Colors
  // *
  const colors = [
    getVariable(theme.orange6),
    getVariable(theme.yellow6),
    getVariable(theme.green6),
    getVariable(theme.blue6),
    getVariable(theme.purple6),
    getVariable(theme.pink6),
    getVariable(theme.red6),
  ]

  return {
    area: assign(
      {
        style: {
          data: {
            fill: getVariable(theme.colorFocus),
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    axis: assign(
      {
        style: {
          axis: {
            fill: 'transparent',
            stroke: getVariable(theme.colorFocus),
            strokeWidth: 2,
            strokeLinecap,
            strokeLinejoin,
          },
          axisLabel: assign({}, centeredLabelStyles, {
            padding,
            stroke: 'transparent',
          }),
          grid: {
            fill: 'none',
            stroke: getVariable(theme.color6),
            strokeDasharray,
            strokeLinecap,
            strokeLinejoin,
            pointerEvents: 'painted',
          },
          ticks: {
            fill: 'transparent',
            size: 5,
            stroke: getVariable(theme.colorFocus),
            strokeWidth: 1,
            strokeLinecap,
            strokeLinejoin,
          },
          tickLabels: assign({}, baseLabelStyles, {
            fill: getVariable(theme.color),
          }),
        },
      },
      baseProps
    ),
    polarDependentAxis: assign({
      style: {
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent',
        },
      },
    }),
    bar: assign(
      {
        style: {
          data: {
            fill: getVariable(theme.color),
            padding,
            strokeWidth: 0,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    boxplot: assign(
      {
        style: {
          max: { padding, stroke: getVariable(theme.color), strokeWidth: 1 },
          maxLabels: assign({}, baseLabelStyles, { padding: 3 }),
          median: { padding, stroke: getVariable(theme.color), strokeWidth: 1 },
          medianLabels: assign({}, baseLabelStyles, { padding: 3 }),
          min: { padding, stroke: getVariable(theme.color), strokeWidth: 1 },
          minLabels: assign({}, baseLabelStyles, { padding: 3 }),
          q1: { padding, fill: getVariable(theme.color) },
          q1Labels: assign({}, baseLabelStyles, { padding: 3 }),
          q3: { padding, fill: getVariable(theme.color) },
          q3Labels: assign({}, baseLabelStyles, { padding: 3 }),
        },
        boxWidth: 20,
      },
      baseProps
    ),
    candlestick: assign(
      {
        style: {
          data: {
            stroke: getVariable(theme.color),
          },
          labels: assign({}, baseLabelStyles, { padding: 5 }),
        },
        candleColors: {
          positive: '#ffffff',
          negative: getVariable(theme.color),
        },
      },
      baseProps
    ),
    chart: baseProps,
    errorbar: assign(
      {
        borderWidth: 8,
        style: {
          data: {
            fill: 'transparent',
            opacity: 1,
            stroke: getVariable(theme.color),
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    group: assign(
      {
        colorScale: colors,
      },
      baseProps
    ),
    histogram: assign(
      {
        style: {
          data: {
            fill: getVariable(theme.color),
            stroke: getVariable(theme.colorFocus),
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: 'vertical',
      titleOrientation: 'top',
      style: {
        data: {
          type: 'circle',
        },
        labels: baseLabelStyles,
        title: assign({}, baseLabelStyles, { padding: 5 }),
      },
    },
    line: assign(
      {
        style: {
          data: {
            fill: 'transparent',
            opacity: 1,
            stroke: getVariable(theme.color),
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    pie: assign(
      {
        colorScale: colors,
        style: {
          data: {
            padding,
            stroke: getVariable(theme.color6),
            strokeWidth: 1,
          },
          labels: assign({}, baseLabelStyles, { padding: 20 }),
        },
      },
      baseProps
    ),
    scatter: assign(
      {
        style: {
          data: {
            fill: getVariable(theme.color),
            opacity: 1,
            stroke: 'transparent',
            strokeWidth: 0,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    stack: assign(
      {
        colorScale: colors,
      },
      baseProps
    ),
    tooltip: {
      style: assign({}, baseLabelStyles, { padding: 0, pointerEvents: 'none' }),
      flyoutStyle: {
        stroke: getVariable(theme.borderColor),
        strokeWidth: 1,
        fill: getVariable(theme.background),
        pointerEvents: 'none',
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10,
    },
    voronoi: assign(
      {
        style: {
          data: {
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 0,
          },
          labels: assign({}, baseLabelStyles, {
            padding: 5,
            pointerEvents: 'none',
          }),
          flyout: {
            stroke: getVariable(theme.colorFocus),
            strokeWidth: 1,
            fill: 'red',
            pointerEvents: 'none',
          },
        },
      },
      baseProps
    ),
  }
}
