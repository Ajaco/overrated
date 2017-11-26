import React from 'react'
import {Line} from 'nivo'

const Sr = ({matches}) => {
  const mappedMatches = matches
    .slice(0, 20)
    .reverse()
    .map((m, i) => ({x: `${i + 1}`, y: m.sr}))
  const data = [
    {
      id: 'sr',
      data: mappedMatches,
      color: 'hsl(299, 70%, 50%)',
    },
  ]

  console.log(data)

  return (
    <div>
      <h2>SR change last 20 matches:</h2>
      <Line
        data={data}
        width={1185}
        height={350}
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
        minY="auto"
        maxY="auto"
        stacked={false}
        curve="monotoneX"
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'center',
        }}
        enableGridX={false}
        enableGridY={true}
        colors="nivo"
        colorBy={function(e) {
          return e.color
        }}
        lineWidth={2}
        enableDots={true}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        enableStackTooltip={true}
      />
    </div>
  )
}

export default Sr
