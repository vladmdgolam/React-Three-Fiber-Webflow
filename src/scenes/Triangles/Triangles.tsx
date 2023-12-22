/* eslint-disable react/no-children-prop */
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Pyramid_2: THREE.Mesh
    Pyramid: THREE.Mesh
  }
  materials: {}
}

const Material = () => <meshStandardMaterial />

export const Triangles = () => {
  const { nodes } = useGLTF("/Roma2.gltf") as GLTFResult

  return (
    <group position={[192.311, -1.063, 30.441]} rotation={[1.606, 0, -Math.PI / 2]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pyramid_2.geometry}
        material={nodes.Pyramid_2.material}
        position={[78.464, 115.821, 88.506]}
        rotation={[-0.084, -0.107, 2.179]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pyramid.geometry}
        material={nodes.Pyramid.material}
        position={[-20.232, 31.981, -6.966]}
        rotation={[0.24, -0.511, -0.924]}
      />
    </group>
  )
}
