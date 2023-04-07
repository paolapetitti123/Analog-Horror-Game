
import { Perf } from 'r3f-perf'
import Level from './Level.jsx'
import { Physics, Debug } from '@react-three/rapier'
import Player from './Player'


export default function Experience()
{

    return <>
        <Perf position="top-left" />
        
        <Physics>
            <Debug/>
            <Level />
            <Player/>
        </Physics>
        
    </>
}