import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store'

const Shirt = () => {

  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/hd_shirt.glb')

  // Debug what's in the model
  console.log("Nodes:", nodes)
  console.log("Materials:", materials)

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  // Use a safeguard to prevent errors
  if (!nodes || !materials) {
    return null;
  }

  // Find the first mesh in the model
  const shirtNode = Object.values(nodes).find(node => node.isMesh) || null;
  console.log("first mesh: ", shirtNode)

  if (!shirtNode) {
    console.error("No mesh found in the model");
    return null;
  }

  return (
    <group
      rotation={[0, Math.PI / -2, 0]}
    >
      <mesh
        castShadow
        geometry={shirtNode.geometry}
        material={Object.values(materials)[0]}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt