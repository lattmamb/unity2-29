import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export const useControls = (
  camera: THREE.PerspectiveCamera | null,
  renderer: THREE.WebGLRenderer | null
): OrbitControls | null => {
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!camera || !renderer) return;

    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.maxPolarAngle = Math.PI / 2;

    return () => {
      controlsRef.current?.dispose();
    };
  }, [camera, renderer]);

  return controlsRef.current;
};