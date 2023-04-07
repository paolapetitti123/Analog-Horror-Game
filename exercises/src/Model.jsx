import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react'

export default function Model()
{
    const TV = useGLTF('/TV/tv34.glb');
    const animations = useAnimations(TV.animations, TV.scene);

    return <primitive object={TV.scene} scale={0.4}>
        <Html>
            <iframe src='https://bruno-simon.com/html/'/>
        </Html>
    </primitive>;
}

useGLTF.preload('./TV/tv34.glb');