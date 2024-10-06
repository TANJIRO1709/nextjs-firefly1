import React, {
    useRef,
    memo,
    useMemo,
    Suspense,
    useState,
    useEffect,
    useContext,
    useCallback,
  } from "react";
  import {
    OrbitControls,
    useGLTF,
    Html,
    TransformControls,
    GizmoHelper,
    GizmoViewport,
    Gltf,
    Outlines,
  } from "@react-three/drei";
  import { useFrame, useThree } from "@react-three/fiber";
  import * as THREE from "three";
  import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
  import EditorContext from "../context/editorContext";
  import { paint, save, screenshot, wallpaper, tiles } from "../assets/icons";
  import shopContext from "../context/shopContext";
  
  const RoomModel = memo(({ modelUrl, selectedRoom, setSelectedRoom, scale }) => {
    const result = useGLTF(modelUrl);
    const { scene } = result;
  
    if (scale) {
      scene.scale.set(scale[0], scale[1], scale[2]);
    }
  
    const handleRoomSelection = useCallback(
      (e) => {
        if (selectedRoom === null) {
          const rooms = e.object.name.split("_");
          let tmpSelectedRoom = "";
          for (let i = 0; i < rooms.length; i++) {
            if (rooms[i] === "bedroom") {
              tmpSelectedRoom = "bedroom";
              break;
            } else if (rooms[i] === "bathroom") {
              tmpSelectedRoom = "bathroom";
              break;
            }
          }
          if (tmpSelectedRoom !== "") {
            setSelectedRoom(tmpSelectedRoom);
            scene.children.forEach((child) => {
              if (child.isMesh && !child.name.includes(tmpSelectedRoom)) {
                scene.remove(child);
              } else if (
                child.isMesh &&
                child.name.includes(tmpSelectedRoom) &&
                child.name.includes("walls")
              ) {
                child.material.side = THREE.FrontSide;
              }
            });
          }
        }
      },
      [selectedRoom, scene, setSelectedRoom]
    );
  
    const handlePointerOver = useCallback(
      (e) => {
        if (selectedRoom === null) {
          const rooms = e.object.name.split("_");
          let tmpSelectedRoom = "";
          for (let i = 0; i < rooms.length; i++) {
            if (rooms[i] === "bedroom") {
              tmpSelectedRoom = "bedroom";
              break;
            } else if (rooms[i] === "bathroom") {
              tmpSelectedRoom = "bathroom";
              break;
            }
          }
          if (tmpSelectedRoom !== "") {
            scene.children.forEach((child) => {
              if (
                child.isMesh &&
                child.name.includes("walls") &&
                child.name.includes(tmpSelectedRoom)
              ) {
                child.material = new THREE.MeshStandardMaterial({
                  color: child.material.color,
                });
                child.material.emissive = new THREE.Color(0x00ff00);
                child.material.emissiveIntensity = 0.5;
              }
            });
          }
        }
      },
      [selectedRoom, scene]
    );
  
    const handlePointerOut = useCallback(() => {
      if (scene) {
        scene.children.forEach((child) => {
          if (child.isMesh) {
            child.material.emissiveIntensity = 0;
          }
        });
      }
    }, [scene]);
  
    return (
      <primitive
        key={modelUrl}
        object={scene}
        onClick={handleRoomSelection}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    );
  });
  
  const ProductModel = ({ modelUrl }) => {
    return <Gltf src={modelUrl} />;
  };
  
  const Editor = ({
    products,
    setProducts,
    compressAndExport,
    setShowSaveModal,
    setModal,
    setActiveCategory,
    setShowModal,
    activeWallColor,
    activeWallTexture,
  }) => {
    const { getPaints, getTiles, getWallpapers } = useContext(shopContext);
    const [selectedObject, setSelectedObject] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { roomModel, singleRoom } = useContext(EditorContext);
    const [transformMode, setTransformMode] = useState("translate");
    const [showPaintsModal, setShowPaintsModal] = useState(false);
    const [showTilesModal, setShowTilesModal] = useState(false);
    const [showWallpapersModal, setShowWallpapersModal] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
  
    const { camera, gl, scene } = useThree();
  
    const groupRef = useRef();
    const groundRef = useRef();
  
    const ambientLight = useMemo(() => <ambientLight intensity={1} />, []);
    const directionalLight = useMemo(
      () => <directionalLight position={[10, 10, 5]} intensity={1} />,
      []
    );
    const raycaster = new THREE.Raycaster();
    const mouse = useMemo(() => new THREE.Vector2(), []);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      const handleMouseClick = () => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(
          groupRef.current.children,
          true
        );
  
        if (intersects.length > 0) {
          setSelectedObject((prev) => {
            if (prev && prev?.name.includes("walls")) {
              prev.material.emissiveIntensity = 0;
            }
  
            return intersects[0].object;
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleMouseClick);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("click", handleMouseClick);
      };
    }, [camera, mouse, raycaster]);
  
    useEffect(() => {
      if (selectedRoom !== null && selectedObject?.name.includes("walls")) {
        setShowPaintsModal(true);
        setShowTilesModal(true);
        setShowWallpapersModal(true);
      } else {
        setShowPaintsModal(false);
        setShowTilesModal(false);
        setShowWallpapersModal(false);
      }
      if (selectedObject !== null && selectedObject?.name.includes("walls")) {
        selectedObject.material.emissive = new THREE.Color(0x00ff00);
        selectedObject.material.emissiveIntensity = 0.5;
      }
    }, [selectedObject, selectedRoom]);
  
    const goToCategory = useCallback(
      async (getCategory, setModalState) => {
        setProducts([]);
        const category = await getCategory();
        setShowModal(true);
        setModal("Products");
        setActiveCategory(category);
        setModalState(true);
      },
      [setActiveCategory, setModal, setShowModal, setProducts]
    );
  
    useEffect(() => {
      if (selectedObject?.name.includes("walls") && activeWallColor !== null) {
        selectedObject.material.map = null;
        selectedObject.material.color.set(activeWallColor);
      }
    }, [activeWallColor, selectedObject]);
  
    useEffect(() => {
      if (activeWallTexture !== null && selectedObject?.name.includes("walls")) {
        selectedObject.material.color.set(0xffffff);
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(activeWallTexture, (texture) => {
          selectedObject.material.map = texture;
          selectedObject.material.needsUpdate = true;
        });
      }
    }, [activeWallTexture, selectedObject]);
  
    const groundMesh = useMemo(
      () => (
        <group>
          {/* Main Ground */}
          <mesh position-y={-0.25} ref={groundRef}>
            <boxGeometry args={[60, 0.4, 60]} />
            <Outlines thickness={0.05} color="hotpink" />
            <meshStandardMaterial color={[2, 1, 3]} />
          </mesh>
  
          {/* Edge Light */}
          <mesh position-y={-0.05} scale={[60.01, 0.5, 60.01]} layers={[0]}>
            <boxGeometry args={[1, 0.1, 1]} />
            <meshStandardMaterial
              color="#c9bfc6" // Orange color
            />
          </mesh>
        </group>
      ),
      []
    );
  
    function Loader() {
      return (
        <Html>
          <div className="z-10 bg-white absolute top-1/2">Loading...</div>
        </Html>
      );
    }
  
    const controls = useMemo(
      () => new PointerLockControls(camera, gl.domElement),
      [camera, gl.domElement]
    );
    const keyboard = useMemo(() => ({}), []);
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        keyboard[e.key] = true;
      };
      const handleKeyUp = (e) => {
        keyboard[e.key] = false;
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, [keyboard]);
  
    const processKeyboard = useCallback(() => {
      if (isLocked) {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
  
        if (keyboard["w"]) {
          camera.position.addScaledVector(direction, 0.1);
        }
        if (keyboard["s"]) {
          camera.position.addScaledVector(direction, -0.1);
        }
        if (keyboard["a"]) {
          camera.position.addScaledVector(
            new THREE.Vector3().crossVectors(camera.up, direction).normalize(),
            0.1
          );
        }
        if (keyboard["d"]) {
          camera.position.addScaledVector(
            new THREE.Vector3().crossVectors(camera.up, direction).normalize(),
            -0.1
          );
        }
      }
    }, [camera, isLocked, keyboard]);
  
    useFrame(() => {
      processKeyboard();
    });
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "t") {
          setTransformMode("translate");
        } else if (event.key === "r") {
          setTransformMode("rotate");
        }
        if (event.key === "Escape") {
          setIsLocked(false);
          controls.unlock();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [controls]);
  
    const lockControls = useCallback(() => {
      controls.lock();
      setIsLocked(true);
    }, [controls]);
  
    const captureScreenshot = useCallback(() => {
      gl.render(scene, camera);
      const dataURL = gl.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png";
      link.click();
    }, [camera, gl, scene]);
  
    return (
      <Suspense fallback={<Loader />}>
        {!isLocked && (
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05} // Increased damping factor for more friction-like effect
            maxPolarAngle={Math.PI / 2} // Limit vertical rotation
            minDistance={2} // Minimum zoom distance
            maxDistance={50} // Maximum zoom distance
            rotateSpeed={0.6} // Adjust the speed of rotation
            zoomSpeed={0.6} // Adjust the speed of zoom
            panSpeed={0.6} // Adjust the speed of panning
          />
        )}
        <GizmoHelper
          alignment="bottom-right"
          margin={[80, 80]}
          //onTarget={() => controls.current.target}
        >
          <GizmoViewport scale={40} position={[0, -20, -20]} />
        </GizmoHelper>
        {ambientLight}
        {directionalLight}
        <group ref={groupRef}>
          {roomModel && singleRoom === null && (
            <RoomModel
              modelUrl={roomModel.modelUrl}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          )}
          {singleRoom && (
            <RoomModel
              modelUrl={singleRoom.modelUrl}
              scale={singleRoom.scale}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          )}
          {products.map((product, index) => (
            <ProductModel
              key={`${product._id}-${index}`}
              modelUrl={product.modelUrl}
            />
          ))}
        </group>
        {groundMesh}
        <Html>
          <div className="w-14 absolute -top-40 -right-[49vw] space-y-5">
            <button
              className="p-2 bg-white border border-gray-300 rounded-full"
              onClick={captureScreenshot}
            >
              <span className="flex w-8 h-8 items-center">{screenshot}</span>
            </button>
            <button
              className="p-2 bg-white border border-gray-300 rounded-full"
              onClick={() => {
                setShowSaveModal(true);
                compressAndExport(groupRef.current);
              }}
            >
              <span className="flex w-8 h-8 items-center">{save}</span>
            </button>
            <button
              className="p-2 bg-white border border-gray-300 rounded-full"
              onClick={lockControls}
            >
              Tour Mode
            </button>
            {showPaintsModal && (
              <button
                className="p-2 bg-white border border-gray-300 rounded-full"
                onClick={() => goToCategory(getPaints, setShowPaintsModal)}
              >
                <span className="flex w-8 h-8 items-center overflow-hidden">
                  {paint}
                </span>
              </button>
            )}
            {showTilesModal && (
              <button
                className="p-2 bg-white border border-gray-300 rounded-full"
                onClick={() => goToCategory(getTiles, setShowTilesModal)}
              >
                <span className="flex w-8 h-8 items-center overflow-hidden">
                  {tiles}
                </span>
              </button>
            )}
            {showWallpapersModal && (
              <button
                className="p-2 bg-white border border-gray-300 rounded-full"
                onClick={() =>
                  goToCategory(getWallpapers, setShowWallpapersModal)
                }
              >
                <span className="flex w-8 h-8 items-center overflow-hidden">
                  {wallpaper}
                </span>
              </button>
            )}
          </div>
        </Html>
        {selectedObject && (
          <TransformControls
            object={selectedObject}
            mode={transformMode}
            showX={
              transformMode === "rotate" || selectedObject?.name.includes("walls")
                ? false
                : true
            }
            showZ={
              transformMode === "rotate" || selectedObject?.name.includes("walls")
                ? false
                : true
            }
            showY={selectedObject?.name.includes("walls") ? false : true}
          />
        )}
      </Suspense>
    );
  };
  
  export default Editor;
  