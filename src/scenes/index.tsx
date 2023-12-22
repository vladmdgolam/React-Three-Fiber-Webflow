import { Cubes } from "./Cubes/Cubes"
import { Ladder } from "./Ladder/Ladder"
import { Torus } from "./Torus"
import { Triangles } from "./Triangles/Triangles"

export enum SceneEnum {
  Ladder = "ladder",
  Torus = "torus",
  Triangles = "triangles",
  Cubes = "cubes",
}

export const scenes = {
  [SceneEnum.Ladder]: Ladder,
  [SceneEnum.Torus]: Torus,
  [SceneEnum.Triangles]: Triangles,
  [SceneEnum.Cubes]: Cubes,
}
