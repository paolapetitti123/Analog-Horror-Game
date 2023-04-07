import { useKeyboardControls } from "@react-three/drei"
import useGame from "./stores/useGame"

export default function Interface()
{
    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)

    const playButton = useGame((state) => state.start)
    const phase = useGame((state) => state.phase)

    return <div id="startScreen" className="interface" style={{display: 'block'}}>
        {phase === 'ready' && <div className="playDiv" onClick={ playButton }> Play</div>}

        {/* CONTROLS */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : ''}` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : ''}` }></div>
                <div className={ `key ${ backward ? 'active' : ''}` }></div>
                <div className={ `key ${ rightward ? 'active' : ''}` }></div>
            </div>
        </div>
    </div> 
}