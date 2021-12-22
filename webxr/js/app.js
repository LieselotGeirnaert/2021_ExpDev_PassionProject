{
  let xrSession;
  let canvas;
  let gl;
  let scene;
  let camera;
  let renderer;
  let stabilized = false;
  let localReferenceSpace;
  let viewerSpace;
  let hitTestSource;
  let box;

  const checkXRSupport = async () => {
    const isArSessionSupported =
      navigator.xr &&
      navigator.xr.isSessionSupported &&
      (await navigator.xr.isSessionSupported("immersive-ar"));
    if (isArSessionSupported) {
      document.getElementById("enter-ar").addEventListener("click", activateXR);
    } else {
      document.body.classList.add("unsupported");
    }
  };

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
      document.body.classList.add("unsupported");
    }
  };

  const createXRCanvas = () => {
    canvas = document.querySelector(".canvas");
    gl = canvas.getContext("webgl", { xrCompatible: true });
   
    xrSession.updateRenderState({
      baseLayer: new XRWebGLLayer(xrSession, gl),
    });    
  };

  const onSessionStarted = async () => {
    document.body.classList.add("ar");
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
      canvas: canvas,
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

  const init = () => {
    checkXRSupport();
  };

  init();
}
