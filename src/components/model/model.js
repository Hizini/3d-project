import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
	const { nodes, materials } = useGLTF('/assets/model/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.27}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Cube_033_2_0.geometry} material={materials.Cube_033} scale={1.048} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/model/scene.gltf')
