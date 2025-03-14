import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  TonemapPlugin,
  SSRPlugin,
  GBufferPlugin,
  GammaCorrectionPlugin,
  SSAOPlugin,
  GroundPlugin,
  BloomPlugin,
  ProgressivePlugin,
  AssetManagerPlugin,
  // Add a comma here
  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = () => {
  const canvasRef = useRef(null);

  const memorizedScrollAnimation = useCallback(
    (position,target,onUpdate)=>{
        if(position && target && onUpdate){
            scrollAnimation(position,target,onUpdate);
        }
    },[]
  )

  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin (true) );
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(GroundPlugin);

    viewer.renderer.refreshPipeline();

    await manager.addFromPath("/scene-black.glb");

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled:true});

    window.scrollTo(0, 0);
    let needsUpdate = true;
    const onUpdate = () => {
      console.log("Animation update triggered");
      needsUpdate = true;
      viewer.setDirty();
    };

    let animationFrame;
    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          camera.positionTargetUpdated(true);
          needsUpdate = false;
        });
      }
    });

     memorizedScrollAnimation(position, target,onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, [setupViewer]);

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
};

export default WebgiViewer;
