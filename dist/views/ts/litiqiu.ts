import * as THREE from "three";

//线几何
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

function initThree() {
    const canvas = document.getElementById("three") as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true, //  打开抗锯齿
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0)

    const scene = new THREE.Scene();

    return { canvas, scene, renderer };
}
//摄像机
function initCamera() {
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.5,
        100
    );

    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0)

    return camera;
}

//几何图元
function initGeometry() {
    const fillicogeo = new THREE.IcosahedronGeometry(1.5, 0);



    const fillmaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.1, 0.1, 0.1),
    });

    const fillmesh = new THREE.Mesh(fillicogeo, fillmaterial);

    const lineicogeo = new THREE.IcosahedronGeometry(2.5, 0)
    const geometry = new THREE.WireframeGeometry(lineicogeo);
    const linematerial = new THREE.LineBasicMaterial({
        color: new THREE.Color(0.8, 0.4, 0.4),
        linewidth: 50,
        linecap: 'round', //ignored by WebGLRenderer
        linejoin: 'round' //ignored by WebGLRenderer
    })
    const linemesh = new THREE.LineSegments(geometry, linematerial)
    linemesh.computeLineDistances();

    // 方阵物体
    const group = new THREE.Group()
    const cubegeo = new THREE.BoxGeometry(0.3, 0.3, 0.3)

    const cubematerial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.1, 0.1, 0.1)
    })
    for (var z = 0; z < 10; z++) {//10表示z方向立方体数量
        for (var y = 0; y < 10; y++) {//10表示y方向立方体数量
            for (var x = 0; x < 10; x++) {//10表示x方向立方体数量
                var mesh = new THREE.Mesh(cubegeo, cubematerial);//网格模型对象
                mesh.rotateX(Math.random() * Math.PI)
                mesh.rotateY(Math.random() * Math.PI)
                mesh.rotateZ(Math.random() * Math.PI)
                mesh.position.set(x * 10 - 45, y * 10 - 45, z * 10 - 45);//立方体间距15（阵列距离）
                group.add(mesh);//网格模型添加到场景中
            }
        }
    }


    const meshs = { fillmesh, linemesh, group };

    return meshs;
}

//灯光
function initLight(scene: THREE.Scene) {
    const amcolor = 0xffffff;
    const amintensity = 10;
    const amlight = new THREE.AmbientLight(amcolor, amintensity);
    scene.add(amlight);

    const color = 0xffffff;
    const intensity = 40;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(40, 0, 10);
    scene.add(light);

    const light1 = new THREE.DirectionalLight(0xC71585, 40);
    light1.position.set(-40, -100, 40);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00FFFF, 20);
    light2.position.set(0, 100, -0);
    scene.add(light1);
}



function run() {
    const { canvas, scene, renderer } = initThree();
    const camera = initCamera();

    initLight(scene);
    const meshs = initGeometry();


    scene.add(camera);


    scene.add(meshs.fillmesh, meshs.linemesh, meshs.group);


    animate();

    function animate() {
        let time = 0.005
        requestAnimationFrame(animate);
        meshs.fillmesh.rotateX(-time)
        meshs.fillmesh.rotateY(-time)

        meshs.linemesh.rotateX(time)
        meshs.linemesh.rotateY(time)

        meshs.group.rotateY(0.001)

        render();
    }



    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        render()
    });

    function render() {
        renderer.render(scene, camera)
    }
}

run();
