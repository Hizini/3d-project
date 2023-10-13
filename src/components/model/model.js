import {
    Environment,
    OrbitControls,
    useAnimations,
    useGLTF,
} from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useInput } from "../hook/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
    let directionOffset = 0; // w

    if (forward) {
        if (left) {
            directionOffset = Math.PI / 4; // w+a
        } else if (right) {
            directionOffset = -Math.PI / 4; // w+d
        }
    } else if (backward) {
        if (left) {
            directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
        } else if (right) {
            directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
        } else {
            directionOffset = Math.PI; // s
        }
    } else if (left) {
        directionOffset = Math.PI / 2; // a
    } else if (right) {
        directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
};
let backgroundSize;

const MainModel = ({ backgroundRef, modelRef }) => {
    const model = useGLTF("./assets/model.glb");
    const { actions } = useAnimations(model.animations, model.scene);
    const { forward, backward, left, right, shift, jump } = useInput();
    const [height, setHeight] = useState(0);
    const currentAction = useRef("");
    const controlRef = useRef();
    const camera = useThree((state) => state.camera);

    const updateCameraTarget = (moveX, moveZ) => {
        // 카메라 이동
        camera.position.x += moveX;
        camera.position.z += moveZ;

        // 카메라 타겟 업데이트
        cameraTarget.x = model.scene.position.x;
        cameraTarget.y = model.scene.position.y + (height / 2) * 0.01;
        cameraTarget.z = model.scene.position.z;
        if (controlRef.current) controlRef.current.target = cameraTarget;
    };

    useEffect(() => {
        let bbox = new THREE.Box3().setFromObject(backgroundRef.current);
        backgroundSize = bbox.getSize(new THREE.Vector3());
    }, [backgroundRef.current]);

    useEffect(() => {
        modelRef.current = model.scene;
        let minY = Infinity,
            maxY = -Infinity;
        model.scene.traverse((item) => {
            if (item.isMesh) {
                const geomBox = item.geometry.boundingBox;
                if (minY > geomBox.min.y) minY = geomBox.min.y;
                if (maxY < geomBox.max.y) maxY = geomBox.max.y;
            }
            const h = maxY - minY;
            setHeight(h);
            model.scene.position.set(0,0,0);
        });
    }, [model.scene]);

    useEffect(() => {
        let action = "";
        if (forward || backward || left || right) {
            action = "Walk";
            if (shift) action = "Run";
        } else if (jump) {
            action = "Jump";
        } else {
            action = "Idle";
        }

        if (currentAction.current !== action) {
            const nextActionToPlay = actions[action];
            const current = actions[currentAction.current];
            current?.fadeOut(0.2);
            nextActionToPlay?.reset().fadeIn(0.2).play();
            currentAction.current = action;
        }
    }, [forward, backward, left, right, shift, jump]);

    useEffect(() => {
        if (currentAction.current !== "Idle") return;
        const timer = setTimeout(() => {
            actions["Idle"].fadeOut(0.2);
            actions["Dance"].reset().fadeIn(0.2).play();
            currentAction.current = "Dance";
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentAction.current]);

    useFrame((state, delta) => {
        if (
            currentAction.current === "Run" ||
            currentAction.current === "Walk"
        ) {
            // 카메라 각도 계산
            let angleYCameraDirection = Math.atan2(
                camera.position.x - model.scene.position.x,
                camera.position.z - model.scene.position.z
            );

            // 대각선으로 이동 시 각도 계산
            let newDirectionOffset = directionOffset({
                forward,
                backward,
                left,
                right,
            });

            // 모델 회전
            rotateQuaternion.setFromAxisAngle(
                rotateAngle,
                angleYCameraDirection + newDirectionOffset + Math.PI
            );
            model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

            // 방향 계산
            camera.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

            // run/walk 속도
            const velocity = currentAction.current === "Run" ? 10 : 5;

            // 모델 & 카메라 이동
            const moveX = walkDirection.x * velocity * delta;
            const moveZ = walkDirection.z * velocity * delta;

            // const cannotMove =
            //     (model.scene.position.x + moveX < -3.87 &&
            //         model.scene.position.x + moveX > -5.43 &&
            //         model.scene.position.z + moveZ < 2.87 &&
            //         model.scene.position.z + moveZ > -2.21) ||
            //     (model.scene.position.x + moveX < 5.43 &&
            //         model.scene.position.x + moveX > 3.87 &&
            //         model.scene.position.z + moveZ < 2.21 &&
            //         model.scene.position.z + moveZ > -2.87) ||
            //     (model.scene.position.x + moveX < 3 &&
            //         model.scene.position.x + moveX > -2.22 &&
            //         model.scene.position.z + moveZ < 5.43 &&
            //         model.scene.position.z + moveZ > 3.87) ||
            //     (model.scene.position.x + moveX < 2.22 &&
            //         model.scene.position.x + moveX > -3 &&
            //         model.scene.position.z + moveZ < -3.87 &&
            //         model.scene.position.z + moveZ > -5.43) ||
            //     (model.scene.position.x + moveX < 1.9 &&
            //         model.scene.position.x + moveX > -1.9 &&
            //         model.scene.position.z + moveZ < 0.75 &&
            //         model.scene.position.z + moveZ > -0.75);
            // if (cannotMove) return;
            model.scene.position.x += moveX;
            model.scene.position.z += moveZ;
            updateCameraTarget(moveX, moveZ);
        }
    });

    return (
        <>
            <OrbitControls ref={controlRef} />
            <Environment preset="sunset" />
            <primitive
                scale={0.01}
                object={model.scene}
                position-y={(height / 2) * 0.01}
            />
        </>
    );
};

export default MainModel;
