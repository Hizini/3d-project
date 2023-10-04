import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stats } from "@react-three/drei";
import { BackGroundModel } from "../model/background_model";
import MainModel from "../model/model";
import Loader from "../loader/loader";

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;
`;

const Project = () => {
    const isTest = true;
    return (
        <StyledMain className="main">
            <Canvas camera={{ position: [6, 2, 4] }} shadows>
                {isTest && <axesHelper visible={isTest} args={[5]} />}
                {isTest && <Stats />}
                {isTest && <gridHelper args={[10, 10]} />}
                <Suspense fallback={<Loader />}>
                    <BackGroundModel />
                    <MainModel />
                    <ambientLight intensity={4} />
                </Suspense>
            </Canvas>
        </StyledMain>
    );
};

export default Project;
