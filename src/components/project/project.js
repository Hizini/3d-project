import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { BackGroundModel } from "../model/background_model";

const StyledMain = styled.main`
  width : 100vw;
  height: 100vh;
`;

const Project = () => {
  return (
      <StyledMain className="main">
          <Canvas camera={{ position: [6, 2, 4] }}>
              <Suspense>
                  <BackGroundModel />
                  <OrbitControls />
                  <ambientLight intensity={4} />
              </Suspense>
          </Canvas>
      </StyledMain>
  );
};

export default Project;