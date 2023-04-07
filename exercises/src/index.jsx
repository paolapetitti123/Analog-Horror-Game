import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
    map={[
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW'] },
        { name: 'backward', keys: [ 'ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD']}
    ]}>

    
    <Canvas
        shadows
        camera={ {
            fov: 55,
            near: 0.1,
            far: 100,
            position: [ 0, 2, 7 ]
        } }
    >
        <Experience />
    </Canvas>
    <Interface />
    </KeyboardControls>
)