import React from "react";
import { useGLTF } from "@react-three/drei";

export function BackGroundModel({ backgroundRef }) {
    const { nodes, materials } = useGLTF("/assets/background/scene.gltf");
    return (
        <group dispose={null}>
            <group scale={0.01}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
                    <mesh
                        geometry={nodes.Walls_Walls_0.geometry}
                        material={materials.Walls}
						ref={backgroundRef}
                    />
                    <mesh
                        geometry={nodes.Walls_Ceilling_0.geometry}
                        material={materials.Ceilling}
                    />
                    <mesh
                        geometry={nodes.Walls_Floor_0.geometry}
                        material={materials.Floor}
                    />
                    <mesh
                        geometry={nodes.Walls_Emissive_0.geometry}
                        material={materials.Emissive}
                    />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_1.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_2.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_3.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_4.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_5.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.CeillingWire_CeillingWire_0_6.geometry}
                        material={materials.CeillingWire}
                    />
                </group>
                <mesh
                    geometry={nodes.PaitingsInside_Painting_0.geometry}
                    material={materials.Painting}
                    rotation={[-Math.PI / 2, 0, 0.099]}
                    scale={100}
                />
                <mesh
                    geometry={nodes.PaitingsOutside_Painting_0.geometry}
                    material={materials.Painting}
                    rotation={[-Math.PI / 2, 0, 0.099]}
                    scale={100}
                />
                <mesh
                    geometry={nodes.PaitingsInside001_Painting_0.geometry}
                    material={materials.Painting}
                    rotation={[-Math.PI / 2, 0, 0.099]}
                    scale={100}
                />
                <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
                    <mesh
                        geometry={nodes.LampBase_CeillingWire_0.geometry}
                        material={materials.CeillingWire}
                    />
                    <mesh
                        geometry={nodes.LampBase_Emissive_0.geometry}
                        material={materials.Emissive}
                    />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh
                        geometry={nodes.Lamp_Lamp_0.geometry}
                        material={materials.Lamp}
                    />
                    <mesh
                        geometry={nodes.Lamp_Emissive_0.geometry}
                        material={materials.Emissive}
                    />
                </group>
                <group rotation={[Math.PI, 0, 0]} scale={110.41}>
                    <mesh
                        geometry={nodes.Bench_BenchWood_0.geometry}
                        material={materials.BenchWood}
                    />
                    <mesh
                        geometry={nodes.Bench_BenchConcreteBase_0.geometry}
                        material={materials.BenchConcreteBase}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/assets/background/scene.gltf");
