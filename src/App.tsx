import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function App() {

  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  const clock = new THREE.Clock();

  const ambientLight = new THREE.AmbientLight(0x303030);
  scene.add(ambientLight);

  let camera: any = null;
  let mixer: any = null;
  let animations: any = null;
  const IDLE_CLIP = "idle";
  const JUMP_CLIP = "jump";

  loader.load("./ap2-3-new.glb",
    function (gltf) {
      console.log(gltf);
      camera = gltf.cameras[0];
      scene.add(gltf.scene);

      // const loader = new THREE.TextureLoader();
      // const texture = loader.load("./background.jpg");
      // texture.mapping = THREE.EquirectangularReflectionMapping;
      // const skyGeo = new THREE.SphereGeometry(6);
      // const skyMat = new THREE.MeshLambertMaterial(
      //   {
      //     color: "#ffffff",
      //     map: texture,
      //     side: THREE.BackSide,
      //     lightMapIntensity: 0.5
      //   }
      // )

      // const sky = new THREE.Mesh(skyGeo, skyMat);
      // sky.position.set(0, 1, 0);
      // scene.add(sky)

      animations = gltf.animations;
      mixer = new THREE.AnimationMixer(gltf.scene);
      const clip = THREE.AnimationClip.findByName(animations, IDLE_CLIP);
      mixer.clipAction(clip).play();
      const objects = gltf.scene.children;

      (objects.find(obj => obj.name == "Ambiente"))!.intensity = 0;
      (objects.find(obj => obj.name == "LuzDaRua"))!.intensity = 0;
      (objects.find(obj => obj.name == "Spot001"))!.intensity = 0;
      (objects.find(obj => obj.name == "Spot002"))!.intensity = 0;
      (objects.find(obj => obj.name == "Spot"))!.intensity = 0;
      (objects.find(obj => obj.name == "Luz_Luminaria_Red"))!.intensity = 0;
      // (objects.find(obj => obj.name == "Luz_Luminaria_Green"))!.intensity = 0.5;

      // console.log({
      //   'amb': obj,
      // });
    },
    function (xht) {
      console.log("Progresso: " + xht.loaded / xht.total * (100) + " %");
    },
    function (error) {
      console.log("Ocorreu um erro: " + error);
    }
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.onresize = () => renderer.setSize(window.innerWidth, window.innerHeight);
  function animacao() {
    requestAnimationFrame(animacao);
    if (camera && mixer) {
      renderer.render(scene, camera);
      mixer.update(clock.getDelta());
    }
  }
  animacao();

  const alternar = function () {
    console.log("DE IDLE PRA JUMP");
    const clip = THREE.AnimationClip.findByName(animations, JUMP_CLIP);
    const jumpAction = mixer.clipAction(clip);
    jumpAction.reset();
    jumpAction.setLoop(THREE.LoopOnce);
    jumpAction.fadeIn(1);
    jumpAction.fadeOut(1);
    jumpAction.play(clip);
  }


  return <></>;
}
