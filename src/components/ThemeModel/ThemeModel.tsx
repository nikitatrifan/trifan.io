import { Spinner, styled, useMedia } from "junoblocks";
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { debounce } from "throttle-debounce";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSetRecoilState } from "recoil";
import {
  ThemeModelInterface,
  ThemeModelAtom,
} from "@/components/ThemeModel/ThemeModelInterface";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Renderer = styled("div", {
  width: "100%",
  display: "none",
  visibility: "hidden",
  height: getViewportHeightCssValue(100),
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: "$1",
  variants: {
    variant: {
      spinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: getViewportHeightCssValue(10),
      },
    },
  },
});

export const ThemeModel = (
  props: ComponentPropsWithoutRef<typeof Renderer>
) => {
  const interfaceRef: ThemeModelInterface["interfaceRef"] = useRef({
    model: undefined,
    camera: undefined,
    showcasing: false,
    rendering: false,
    transitionToShowcasingStage: () => {},
    transitionToDefaultStage: () => {},
  });

  const rendererRef: ThemeModelInterface["rendererRef"] = useRef(null);

  const [loadingModel, setLoadingModel] = useState(true);

  const mobile = useMedia("sm");

  const [windowWidth, windowHeight] = useWindowSize();

  const setAtomState = useSetRecoilState(ThemeModelAtom);

  const onModelLoadEvent = useCallback(() => {
    setAtomState({
      interfaceRef,
      rendererRef,
    });
    if (process.env.NODE_ENV === "production") {
      // @ts-ignore
      window.hj?.("event", "Loaded Model");
      // @ts-ignore
      window.gtag?.("event", "loaded_model");
    }
  }, [setAtomState]);

  const onModelUpdateEvent = useCallback(() => {
    setAtomState({
      interfaceRef,
      rendererRef,
    });
  }, [setAtomState]);

  useEffect(() => {
    const rendererNode = document.querySelector(Renderer.toString());

    while (rendererNode?.firstChild) {
      rendererNode.removeChild(rendererNode.firstChild);
    }

    const getCanvasSize = () => {
      return [windowWidth, windowHeight];
    };

    const [width, height] = getCanvasSize();

    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
    camera.position.set(0, 1, 2);
    if (interfaceRef.current) interfaceRef.current.camera = camera;

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.035);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 500, 150, 0.5, 0.5, 1.5);
    spotLight.castShadow = true;
    spotLight.position.set(4, 1, 5);
    spotLight.rotation.set(63.6, 0, 46.7);
    scene.add(spotLight);
    scene.add(spotLight.target);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 3;
    renderer.setSize(width, height);
    rendererNode?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;

    const loader = new GLTFLoader();
    const modelGroup = new THREE.Group();

    // window.camera = camera;

    function prepareModel(child: THREE.Object3D | THREE.Mesh) {
      child.receiveShadow = true;

      if (child.type !== "Mesh") {
        child.castShadow = true;
      }

      if (child.children) {
        child.children.forEach((subChild) => prepareModel(subChild));
      }
    }

    loader.load(
      "/earth.glb",
      function (gltf) {
        if (active) {
          const modelScene = gltf.scene;
          modelScene.position.x = 0;
          modelScene.position.y = -1.15;
          modelScene.name = "earth";

          if (interfaceRef.current) {
            interfaceRef.current.model = modelScene;
          }

          modelScene.children.forEach((child) => prepareModel(child));
          modelGroup.add(modelScene);
          prepareModel(modelGroup);
          scene.add(modelGroup);
          setLoadingModel(false);
          onModelLoadEvent();
        }
      },
      (xhr) => {},
      (error) => {
        console.log(error);
      }
    );

    const onWindowResize = debounce(350, () => {
      const [w, h] = getCanvasSize();
      camera.aspect = w / h;
      const cameraPosition = camera.position.clone();
      camera.updateProjectionMatrix();
      Object.assign(camera.position, cameraPosition);
      renderer.render(scene, camera);
      renderer.setSize(w, h);
      render();

      onModelUpdateEvent();
    });

    window.addEventListener("resize", onWindowResize, false);

    let animatingRotation = true;
    let active = true;

    function animate() {
      if (active) requestAnimationFrame(animate);

      render();
    }

    let initializedCameraPosition = false;

    function render() {
      if (interfaceRef.current?.rendering) {
        controls.update();
        renderer?.render(scene, camera);
        camera.updateProjectionMatrix();
        spotLight.lookAt(scene.position);

        if (animatingRotation && interfaceRef.current.model) {
          interfaceRef.current.model.rotation.y -= 0.0005;
        }

        if (!initializedCameraPosition) {
          camera.lookAt(scene.position);
        }
      }
    }

    animate();

    return () => {
      active = false;
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, [
    interfaceRef,
    mobile,
    onModelLoadEvent,
    onModelUpdateEvent,
    windowHeight,
    windowWidth,
  ]);

  // useLayoutEffect(() => {
  //   let active = true;
  //   const renderer = document.querySelector("#theme-model-renderer");
  //   function instantiate() {
  //     if (active) {
  //       requestAnimationFrame(instantiate);
  //     }
  //     console.log(
  //       "display",
  //       renderer?.style.display,
  //       "rendering",
  //       interfaceRef.current?.rendering
  //     );
  //   }
  //   instantiate();
  //   return () => {
  //     active = false;
  //   };
  // }, []);

  return <Renderer id="theme-model-renderer" ref={rendererRef} {...props} />;
};
