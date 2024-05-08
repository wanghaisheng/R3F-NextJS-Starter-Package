import { CircleMenu, CircleMenuItem, TooltipPlacement } from 'react-circular-menu'

export default function RadialMenuComponent() {
  return (
    <CircleMenu
      startAngle={-90}
      rotationAngle={360}
      itemSize={2}
      radius={5}
      /**
       * rotationAngleInclusive (default true)
       * Whether to include the ending angle in rotation because an
       * item at 360deg is the same as an item at 0deg if inclusive.
       * Leave this prop for angles other than 360deg unless otherwise desired.
       */
      rotationAngleInclusive={false}
    >
      <CircleMenuItem
        onClick={() => alert('You clicked on BUDDHA')}
        tooltip='BUDDHA'
        // tooltipPlacement={TooltipPlacement.Right}
        style={{ background: '#FFF', color: '#000' }}
      >
        B
      </CircleMenuItem>
      <CircleMenuItem
        style={{ background: '#007090', color: '#000' }}
        onClick={() => alert('You clicked on VAJRA')}
        tooltip='VAJRA'
      >
        V
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on KARMA')} tooltip='KARMA'>
        K
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on RATNA')} tooltip='RATNA'>
        R
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on PADMA')} tooltip='PADMA'>
        P
      </CircleMenuItem>
    </CircleMenu>
  )
}
