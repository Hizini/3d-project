import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stats } from "@react-three/drei";
import { BackGroundModel } from "../model/background_model";
import MainModel from "../model/model";
import Loader from "../loader/loader";
import Modal from "react-modal";

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;
`;

const Project = () => {
    const isTest = true;
    const backgroundRef = useRef();
    const modelRef = useRef();
    const [dialogValue, setDialogValue] = useState();
    const [dialogOpenObj, setDialogOpenObj] = useState({
        khj: false,
        contact: false,
        skills: false,
    });

    const handleClickPhoto = (value) => {
        setDialogValue(value);
        switch (value) {
            case "khj":
                setDialogOpenObj({ ...dialogOpenObj, khj: true });
                break;
            case "contact":
                setDialogOpenObj({ ...dialogOpenObj, contact: true });
                console.log("contact");
                break;
            case "skills":
                setDialogOpenObj({ ...dialogOpenObj, skills: true });
                console.log("skills");
                break;
            default:
                break;
        }
    };

    const handleCloseDialog = () => {
        if (!dialogValue) return;
        dialogOpenObj[dialogValue] = false;
        setDialogValue();
    };

    return (
        <StyledMain className="main">
            <Canvas camera={{ position: [3.5, 2, 2] }} shadows>
                {isTest && <axesHelper visible={isTest} args={[5]} />}
                {isTest && <Stats />}
                {isTest && <gridHelper args={[10, 10]} />}
                <Suspense fallback={<Loader />}>
                    <BackGroundModel
                        backgroundRef={backgroundRef}
                        handleClickPhoto={handleClickPhoto}
                    />
                    <MainModel
                        backgroundRef={backgroundRef}
                        modelRef={modelRef}
                    />
                    <ambientLight intensity={1} />
                </Suspense>
            </Canvas>
            <Modal
                isOpen={dialogOpenObj.khj}
                onRequestClose={handleCloseDialog}
                contentLabel="예시 모달"
            >
                <h2>모달 제목 khj</h2>
                <p>모달 내용</p>
            </Modal>
            <Modal
                isOpen={dialogOpenObj.contact}
                onRequestClose={handleCloseDialog}
                contentLabel="예시 모달"
            >
                <h2>모달 제목 contact</h2>
                <p>모달 내용</p>
            </Modal>
            <Modal
                isOpen={dialogOpenObj.skills}
                onRequestClose={handleCloseDialog}
                contentLabel="예시 모달"
            >
                <h2>모달 제목 skills</h2>
                <p>모달 내용</p>
            </Modal>
        </StyledMain>
    );
};

export default Project;
