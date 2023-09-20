import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { Model } from "../model/model";

const StyledMain = styled.main`
  width : 100vw;
  height: 100vh;
`;

const Project = () => {
  return (
    <StyledMain className="main">
      <Canvas>
        <Suspense
        >
          <Model />
          <OrbitControls />
		  <ambientLight intensity={6} />
          <Environment files="/assets/background.hdr" background />
        </Suspense>
      </Canvas>
    </StyledMain>
  );
};

export default Project;