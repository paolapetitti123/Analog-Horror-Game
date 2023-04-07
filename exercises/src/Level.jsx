import { Html, useGLTF, useTexture } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three'



THREE.ColorManagement.legacyMode = false;

const floorGeometry = new THREE.BoxGeometry(1,1,1);
const wallMaterial = new THREE.MeshStandardMaterial({color : 'white'});


function BlockStart({position=[0,0,0]})
{
    return <group position={position}> 
    <RigidBody type='fixed' restitution={0.2} friction={0}>

        {/* FLOOR COLLIDER */}
        <CuboidCollider args={[5.5,1,20]}
        position={[0,-1.3,3.2]} 
        restitution={0.2}
        friction={1}/>

        {/* TABLE TV */}
        <CuboidCollider args={[5.5,10,1]}
        position={[0,1,1]}
        restitution={0.2}
        friction={1}
        
         />


         
          </RigidBody>
    </group>
}

function Bounds()
{
    return <>
    <RigidBody type='fixed'
    restitution={0.2}
    friction={0}>
        {/* BACK WALL */}
        <mesh geometry={floorGeometry}
        position={[0,0.1,14]}
        scale={[12,6.5,0.5]}
        material={wallMaterial}
        castShadow
        />
        {/* RIGHT WALL */}
        <mesh geometry={floorGeometry}
        position={[6.5,5,2]}
        scale={[2,10,30]}
        material={wallMaterial}
        castShadow
        />

        {/* LEFT WALL */}
        <mesh geometry={floorGeometry}
        position={[-6.4,5,10]}
        scale={[2,10,35]}
        material={wallMaterial}
        castShadow
        />
      
    </RigidBody>
    </>
}


export default function Level()
{
    <color args={ [ '#030202' ] } attach="background" />
    const { nodes } = useGLTF('/TV/tv38.glb');
    console.log(nodes);

    const bakedTexture = useTexture('/TV/baked5.png');

    bakedTexture.flipY = false;
    console.log(bakedTexture);


    return <> 
        <mesh geometry = { nodes.bakedNew.geometry }
        scale={[0.35,0.35,0.35]} 
        onClick={(event) => {
            // console.log(event.object.name);
            event.stopPropagation();
            var iframe1 = document.getElementById('gameIframe');
            iframe1.style.display = 'block';
        }}
        >
            
            <meshBasicMaterial map={ bakedTexture } />
               <Html transform
        wrapperClass='htmlScreen'
        distanceFactor={2}
        position={[0,6.1, 1.5]}
        scale={[1,1,1]} 
        occlude="blending"
        zIndexRange={[0,1]}
        onClick={(e)=> {
            console.log('clicking');
        }}
        > 
        <iframe id='gameIframe' style={{display:"none"}} src='https://paolapetitti123.github.io/CART411-Game/p5/game/index.html'/>
    </Html>
        </mesh>
        
    
            <Bounds />
            <BlockStart position={[0,0,0]}/>

                
    </>
}