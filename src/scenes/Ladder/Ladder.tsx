/* eslint-disable react/no-children-prop */
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Cube_2: THREE.Mesh
    mesh_0_instance_1: THREE.Mesh
    mesh_0_instance_2: THREE.Mesh
    mesh_0_instance_3: THREE.Mesh
    mesh_0_instance_4: THREE.Mesh
  }
  materials: {}
}

const Material = () => <meshStandardMaterial />

export const Ladder = () => {
  const { nodes } = useGLTF("/Roma.gltf") as GLTFResult

  return (
    <group position={[192.311, -1.063, 30.441]} rotation={[1.606, 0, -Math.PI / 2]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_instance_1.geometry}
        children={<Material />}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_instance_2.geometry}
        children={<Material />}
        position={[96, 25, -100]}
        scale={[1, 0.85, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_instance_3.geometry}
        children={<Material />}
        position={[192, 50, -200]}
        scale={[1, 0.7, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0_instance_4.geometry}
        children={<Material />}
        position={[288, 75, -300]}
        scale={[1, 0.55, 1]}
      />
    </group>
  )
}
