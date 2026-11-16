import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const _dummy = new THREE.Object3D();
const _targetTilt = new THREE.Vector2(0, 0);
const _currentTilt = new THREE.Vector2(0, 0);

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function HeroGeometryCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSoftwareGl = detectSoftwareWebGL();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setContextLost(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a1128, 0);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1128, 0.042);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(0, 0.15, 7.6);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // 3-point warm/cool architectural lighting
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x050816, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    const sapphireRim = new THREE.DirectionalLight(0x2563eb, 2.8);
    sapphireRim.position.set(-6, -3, -4);
    scene.add(sapphireRim);

    const silverRim = new THREE.PointLight(0x60a5fa, 3.2, 18, 1.5);
    silverRim.position.set(3.5, -2.5, 4);
    scene.add(silverRim);

    // Composite 7-part architectural geometric sculpture
    const sculpture = new THREE.Group();
    const updateSculptureOffset = (w: number) => {
      if (w >= 1024) {
        sculpture.position.set(1.95, 0.05, 0);
        sculpture.scale.setScalar(1);
      } else if (w >= 640) {
        sculpture.position.set(0.8, 0.25, -0.5);
        sculpture.scale.setScalar(0.86);
      } else {
        sculpture.position.set(0, 0.65, -1.1);
        sculpture.scale.setScalar(0.74);
      }
    };
    updateSculptureOffset(width);
    scene.add(sculpture);

    const disposables: { dispose: () => void }[] = [envTarget.texture];

    // 1. Outer Geodesic Wireframe Lattice (Brushed Silver)
    const icoBase = new THREE.IcosahedronGeometry(2.25, 1);
    const icoEdges = new THREE.EdgesGeometry(icoBase, 1);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.24,
    });
    const outerLattice = new THREE.LineSegments(icoEdges, wireMat);
    sculpture.add(outerLattice);
    disposables.push(icoBase, icoEdges, wireMat);

    // 2. Primary Brushed Titanium Gimbal Ring
    const outerRingGeo = new THREE.TorusGeometry(1.92, 0.032, 24, 128);
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbe4f0,
      metalness: 0.94,
      roughness: 0.18,
      anisotropy: 0.8,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });
    const primaryGimbal = new THREE.Mesh(outerRingGeo, titaniumMat);
    primaryGimbal.rotation.set(Math.PI * 0.28, Math.PI * 0.14, 0);
    sculpture.add(primaryGimbal);
    disposables.push(outerRingGeo, titaniumMat);

    // 3. Secondary Electric Sapphire Orbital Ring
    const midRingGeo = new THREE.TorusGeometry(1.56, 0.028, 24, 128);
    const sapphireMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const secondaryGimbal = new THREE.Mesh(midRingGeo, sapphireMetalMat);
    secondaryGimbal.rotation.set(-Math.PI * 0.34, Math.PI * 0.25, 0.2);
    sculpture.add(secondaryGimbal);
    disposables.push(midRingGeo, sapphireMetalMat);

    // 4. Inner Equatorial Precision Ring
    const innerRingGeo = new THREE.TorusGeometry(1.22, 0.018, 20, 96);
    const darkObsidianMetal = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.28,
    });
    const equatorialRing = new THREE.Mesh(innerRingGeo, darkObsidianMetal);
    equatorialRing.rotation.set(Math.PI * 0.5, 0.18, 0);
    sculpture.add(equatorialRing);
    disposables.push(innerRingGeo, darkObsidianMetal);

    // 5. Inner Faceted Sapphire Crystal Core
    const coreGeo = new THREE.OctahedronGeometry(0.88, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: isSoftwareGl ? 0.25 : 0.05,
      roughness: 0.06,
      transmission: isSoftwareGl ? 0 : 0.9,
      transparent: true,
      opacity: isSoftwareGl ? 0.52 : 1.0,
      ior: 1.85,
      thickness: 1.4,
      attenuationColor: new THREE.Color(0x1d4ed8),
      attenuationDistance: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const coreCrystal = new THREE.Mesh(coreGeo, crystalMat);
    sculpture.add(coreCrystal);
    disposables.push(coreGeo, crystalMat);

    // Core Inner Wireframe Accent
    const coreEdgeGeo = new THREE.EdgesGeometry(coreGeo, 1);
    const coreEdgeMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.55,
    });
    const coreEdges = new THREE.LineSegments(coreEdgeGeo, coreEdgeMat);
    coreCrystal.add(coreEdges);
    disposables.push(coreEdgeGeo, coreEdgeMat);

    // 6. Instanced Vernier Markers around the Primary Gimbal (24 parts)
    const tickGeo = new THREE.BoxGeometry(0.018, 0.085, 0.032);
    const tickMesh = new THREE.InstancedMesh(tickGeo, titaniumMat, 24);
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      _dummy.position.set(Math.cos(angle) * 1.92, Math.sin(angle) * 1.92, 0);
      _dummy.rotation.set(0, 0, angle + Math.PI * 0.5);
      _dummy.scale.setScalar(i % 6 === 0 ? 1.4 : 0.85);
      _dummy.updateMatrix();
      tickMesh.setMatrixAt(i, _dummy.matrix);
    }
    tickMesh.instanceMatrix.needsUpdate = true;
    tickMesh.computeBoundingSphere();
    primaryGimbal.add(tickMesh);
    disposables.push(tickGeo);

    // 7. Instanced Geodesic Nodes on Icosahedron Vertices (12 parts)
    const nodeGeo = new THREE.OctahedronGeometry(0.045, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.45,
      metalness: 0.85,
      roughness: 0.2,
    });
    const baseIco = new THREE.IcosahedronGeometry(2.25, 0);
    const posAttr = baseIco.attributes.position;
    const uniqueVerts: THREE.Vector3[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const exists = uniqueVerts.some(
        (v) => Math.abs(v.x - vx) < 0.01 && Math.abs(v.y - vy) < 0.01 && Math.abs(v.z - vz) < 0.01,
      );
      if (!exists) uniqueVerts.push(new THREE.Vector3(vx, vy, vz));
    }
    const nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, uniqueVerts.length);
    uniqueVerts.forEach((v, idx) => {
      _dummy.position.copy(v);
      _dummy.rotation.set(idx * 0.4, idx * 0.7, 0);
      _dummy.scale.setScalar(1);
      _dummy.updateMatrix();
      nodeMesh.setMatrixAt(idx, _dummy.matrix);
    });
    nodeMesh.instanceMatrix.needsUpdate = true;
    nodeMesh.computeBoundingSphere();
    outerLattice.add(nodeMesh);
    disposables.push(baseIco, nodeGeo, nodeMat);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      _targetTilt.set(ny * 0.16, nx * 0.22);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateSculptureOffset(w);
    };
    window.addEventListener('resize', onResize);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const renderFrame = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        _currentTilt.x = THREE.MathUtils.damp(_currentTilt.x, _targetTilt.x, 4, delta);
        _currentTilt.y = THREE.MathUtils.damp(_currentTilt.y, _targetTilt.y, 4, delta);

        sculpture.rotation.x = _currentTilt.x;
        sculpture.rotation.y = elapsed * 0.085 + _currentTilt.y;

        outerLattice.rotation.z = elapsed * 0.04;
        primaryGimbal.rotation.z += delta * 0.11;
        secondaryGimbal.rotation.z -= delta * 0.14;
        equatorialRing.rotation.z += delta * 0.09;
        coreCrystal.rotation.y -= delta * 0.22;
        coreCrystal.rotation.x = Math.sin(elapsed * 0.45) * 0.18;
      }

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        if (isSoftwareGl) {
          afterDraw(renderFrame);
        } else {
          frameId = requestAnimationFrame(renderFrame);
        }
      }
    };

    renderFrame();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle architectural gradient backing so WebGL never loads into a cold void */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 72% 45%, rgba(37, 99, 235, 0.18) 0%, rgba(15, 25, 56, 0.35) 38%, rgba(10, 17, 40, 0.96) 76%)',
        }}
      />
      {!contextLost && <div ref={mountRef} className="absolute inset-0 w-full h-full" />}
      {/* Measured directional scrim guaranteeing crisp text legibility on left column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 17, 40, 0.92) 0%, rgba(10, 17, 40, 0.68) 44%, rgba(10, 17, 40, 0.18) 100%)',
        }}
      />
    </div>
  );
}
