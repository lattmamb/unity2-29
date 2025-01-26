import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { toast } from '@/components/ui/use-toast';

export const useModelLoader = (
  scene: THREE.Scene | null,
  modelPath: string
): void => {
  useEffect(() => {
    if (!scene) return;

    // Temporary cube while model loads
    const cubeGeometry = new THREE.BoxGeometry(2, 1, 4);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x0066FF,
      transparent: true,
      opacity: 0.8
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 0.5;
    scene.add(cube);

    // Load Tesla Model X
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.multiplyScalar(scale);
        
        model.position.sub(center.multiplyScalar(scale));
        model.position.y = 0.5;
        
        scene.add(model);
        scene.remove(cube);
        
        toast({
          title: "Model X loaded successfully",
          description: "You can now interact with the 3D model",
        });
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        toast({
          title: "Error loading Model X",
          description: "Using placeholder model instead",
          variant: "destructive",
        });
      }
    );

    return () => {
      scene.remove(cube);
    };
  }, [scene, modelPath]);
};