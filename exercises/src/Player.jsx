import { RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useState, useEffect, useRef } from "react";
import * as THREE from 'three'
import { Vector3 } from "three";
import useGame from "./stores/useGame.jsx";

export default function Player()
{
    let gamePlaying; // This is supposed to help me figure out what the state of the iframe is at
    const body = useRef();
    const [ subscribeKeys, getKeys ] = useKeyboardControls();

    const [ smoothCamPosition ] = useState(() => new Vector3());
    const [ smoothCamTarget ] = useState(() => new Vector3());

    const start = useGame((state)=> state.start);
    const end = useGame((state)=> state.end);

    useFrame((state,delta) => 
    {
        /**
         * Keyboard Controls
         */
        const { forward, backward, leftward, rightward } = getKeys();
        
        const impulse = { x:0, y:0,z:0};
        const torque = { x:0, y:0,z:0};

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if(forward){
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }
        else if(backward){
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }
        else if(leftward){
            impulse.x -= impulseStrength;
            torque.x -= torqueStrength;
        }
        else if(rightward){
            impulse.x += impulseStrength;
            torque.x += torqueStrength;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);

        /**
         * Camera
         */
        const bodyPosition = body.current.translation();

        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 0;
        cameraPosition.y += 2.05;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 2.05;

        smoothCamPosition.lerp(cameraPosition, 0.1 * delta);
        smoothCamTarget.lerp(cameraTarget, 0.1 * delta);


        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(cameraTarget);


        /**
         * The following two if statements are retrieving the variable "gamePlaying" from the iframe
         * so that when it turns false I can later use it to end the game.
         * 
         * link to where I got the code: 
         * https://stackoverflow.com/questions/13757943/access-a-variable-of-iframe-from-parent
         */
        if(typeof window.addEventListener != 'undefined'){
            window.addEventListener('message', (e) => {
                gamePlaying = e.data[1];
                console.log(gamePlaying); // IT WORKS
                
                if(gamePlaying == false){
                    end();
                }
            }, false);
        } else if(typeof window.attachEvent != 'undefined'){
            window.attachEvent('onmessage', (e) => {
                gamePlaying = e.data;
                console.log(gamePlaying);
            });
        }       
    })

    /**
     * When the game is over I'm simply just going to reload the page.
     */
    const reset = () => {
        location.reload();
    }

    useEffect(() => {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => // value is phase
            { 
               if(value == 'ready'){
                reset()
               }
            }
        )
        const unsubscribeAny = subscribeKeys(
            () => 
            {
                // start()
            }
        )
        return () => {
            unsubscribeReset();
            unsubscribeAny();
        }
    }, [])

    /**
     * Player ball 
     */
    return <RigidBody 
    ref={body} 
    colliders="ball" 
    restitution={0.5} 
    friction={1} 
    linearDamping={0.5}
    angularDamping={0.5}
    position={[0,2,10]}>
        <mesh >
        <icosahedronGeometry args={[0.4,1]}/>
    </mesh>
    </RigidBody>
}