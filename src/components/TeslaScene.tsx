import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSceneSetup } from './three/useSceneSetup';
import { useControls } from './three/useControls';
import { useModelLoader } from './three/useModelLoader';

export const TeslaScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, camera, renderer] = useSceneSetup(mountRef);
  const controls = useControls(camera, renderer);
  
  useModelLoader(scene, '/tesla-model-x.glb');

  // Animation loop
  useEffect(() => {
    if (!scene || !camera || !renderer || !controls) return;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scene, camera, renderer, controls]);

  return (
    <motion.div 
      ref={mountRef} 
      className="w-full h-[80vh] rounded-xl overflow-hidden glass-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};