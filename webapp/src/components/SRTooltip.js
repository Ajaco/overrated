import React from 'react'
import {Icon, Popover} from 'antd'

const SRTooltip = ({change, result}) => {
  return (
    <Popover
      content={
        <div>
          If you gained rating from a loss, or lost rating after a victory
          <br />it's most likely due to missing matches in the match history
        </div>
      }
      title={<span style={{fontWeight: 'bold'}}>Unexpected rating change?</span>}
    >
      <Icon style={{color: '#959595', marginLeft: 10}} type="question-circle-o" />
    </Popover>
  )
}

export default SRTooltip
