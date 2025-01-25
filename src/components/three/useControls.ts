import { useEffect, MutableRefObject } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export const useControls = (
  camera: THREE.PerspectiveCamera | null,
  renderer: THREE.WebGLRenderer | null
): OrbitControls | null => {
  const controlsRef = useEffect<OrbitControls | null>(() => {
    if (!camera || !renderer) return null;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;

    return controls;
  }, [camera, renderer]);

  return controlsRef;
};