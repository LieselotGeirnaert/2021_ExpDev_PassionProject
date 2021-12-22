import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
const { XRWebGLLayer } = window;

const App = () => {
  const [XRIsSupported, setXRIsSupported] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    console.log(canvasRef.current);

    const checkXRSupport = async () => {
      const isArSessionSupported =
        navigator.xr &&
        navigator.xr.isSessionSupported &&
        (await navigator.xr.isSessionSupported("immersive-ar"));
      if (isArSessionSupported) {
        setXRIsSupported(true);
      } else {
        setXRIsSupported(false);
      }
    };

    checkXRSupport();
  }, []);

  const openAR = () => {
    console.log("open");

    let xrSession;
    let gl;
    let scene;
    let camera;
    let renderer;
    let stabilized = false;
    let localReferenceSpace;
    let viewerSpace;
    let hitTestSource;
    let box;

    const activateXR = async () => {
      try {
        xrSession = await navigator.xr.requestSession("immersive-ar", {
          requiredFeatures: ["hit-test", "dom-overlay"],
          domOverlay: { root: document.body },
        });

        createXRCanvas();
        await onSessionStarted();
      } catch (e) {
        console.log(e);
        setXRIsSupported(false)
      }
    };

    const createXRCanvas = () => {
      // canvas = document.createElement("canvas");
      // document.body.appendChild(canvas);
      gl = canvasRef.current.getContext("webgl", { xrCompatible: true });
      console.log("canvas ", canvasRef);
      console.log("gl ", gl);
      console.log("xrSession 1 ", xrSession);

      xrSession.updateRenderState({
        baseLayer: new XRWebGLLayer(xrSession, gl),
      });

      console.log("xrSession 2 ", xrSession);

    };

    const onSessionStarted = async () => {
      // document.body.classList.add("ar");
      setupThreeJs();
      localReferenceSpace = await xrSession.requestReferenceSpace("local");
      viewerSpace = await xrSession.requestReferenceSpace("viewer");
      hitTestSource = await xrSession.requestHitTestSource({
        space: viewerSpace,
        entityTypes: ["mesh"],
      });

      xrSession.requestAnimationFrame(onXRFrame);
    };

    const shutdownSession = async () => {
      if (xrSession) {
        await xrSession.end();
        document.body.classList.remove("stabilized");
        document.body.classList.remove("ar");

        console.log("session ended");
      }
    };

    const onXRFrame = (time, frame) => {
      xrSession.requestAnimationFrame(onXRFrame);

      const framebuffer = xrSession.renderState.baseLayer.framebuffer;      
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      console.log("framebuffer", framebuffer);
      console.log("renderer", renderer);

      renderer.setFramebuffer(framebuffer);

      console.log("framebuffer", framebuffer);
      console.log("renderer", renderer);

      const pose = frame.getViewerPose(localReferenceSpace);
      if (pose) {
        const view = pose.views[0];

        const viewport = xrSession.renderState.baseLayer.getViewport(view);
        renderer.setSize(viewport.width, viewport.height);

        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        let hitTestResults = [];
        hitTestResults = frame.getHitTestResults(hitTestSource);
        if (hitTestResults.length > 0) {
          shutdownSession();
        }
        console.log("results ", hitTestResults);

        if (!stabilized) {
          stabilized = true;
          document.body.classList.add("stabilized");
        }

        renderer.render(scene, camera);
      }
    };

    const setupThreeJs = () => {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvasRef.current,
        context: gl,
      });
      renderer.autoClear = false;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      scene = createCubeScene();
      camera = new THREE.PerspectiveCamera();
      camera.matrixAutoUpdate = false;
    };

    const createCubeScene = () => {
      const scene = new THREE.Scene();
      box = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      box.position.set(1, 0, 1);
      scene.add(box);

      return scene;
    };

    activateXR();
  };

  return (
    <div className="App">
      <p>test</p>
      <button disabled={!XRIsSupported} onClick={openAR}>
        {XRIsSupported ? "enter ar" : "not supported"}
      </button>
      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
