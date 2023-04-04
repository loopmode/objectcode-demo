import { Box, OrthographicCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { useCallback, useState } from 'react';
import { Size } from '../../common-types';

type SceneProps = {
  boxSize: Size;
};
type DraggableBoxProps = {
  boxSize: Size;
  handleSize?: number;
};

function DraggableBox({ boxSize = { width: 100, height: 100 }, handleSize = 10 }: DraggableBoxProps) {
  const handleDragStart = useCallback((e: any) => {
    console.log(e.target);
  }, []);

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const [topPosition, setTopPosition] = useState<any>([0, boxSize.height * 0.5 + handleSize * 0.5, 0]);
  const bindTop = useDrag(({ offset: [x, y] }) => {
    const [, , z] = topPosition;
    setTopPosition([x / aspect, -y / aspect, z]);
  }, {});

  return (
    <group>
      <Box args={[boxSize.width, boxSize.height, 1]} position={[0, 0, 0]}>
        <meshPhongMaterial attach="material" color="white" />
      </Box>

      <mesh name="top-handle" {...bindTop()}>
        <Box args={[boxSize.width, handleSize, 1]} position={topPosition}>
          <meshLambertMaterial attach="material" color="red" opacity={0.5} transparent />
        </Box>
      </mesh>
      <mesh name="bottom-handle" onClick={handleDragStart}>
        <Box args={[boxSize.width, handleSize, 1]} position={[0, -boxSize.height * 0.5 - handleSize * 0.5, 0]}>
          <meshLambertMaterial attach="material" color="red" opacity={0.5} transparent />
        </Box>
      </mesh>

      <mesh onClick={handleDragStart}>
        <Box args={[handleSize, boxSize.height, 1]} position={[-boxSize.width * 0.5 - handleSize * 0.5, 0, 0]}>
          <meshLambertMaterial attach="material" color="red" opacity={0.5} transparent />
        </Box>
      </mesh>

      <mesh onClick={handleDragStart}>
        <Box args={[handleSize, boxSize.height, 1]} position={[boxSize.width * 0.5 + handleSize * 0.5, 0, 0]}>
          <meshLambertMaterial attach="material" color="red" opacity={0.5} transparent />
        </Box>
      </mesh>
    </group>
  );
}
export function Scene({ boxSize }: SceneProps) {
  return (
    <Canvas frameloop="always">
      <ambientLight intensity={0.25} />
      <pointLight intensity={0.75} position={[500, 500, 1000]} />
      <DraggableBox boxSize={boxSize} />
      <OrthographicCamera
        makeDefault
        zoom={1}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={1}
        far={2000}
        position={[0, 0, 200]}
      />
    </Canvas>
  );
}
