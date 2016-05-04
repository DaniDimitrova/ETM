var container, renderer, raycaster; // element containing canvas
var cylinder; // cylinder mesh for panorama
var camera, scene; // scene
var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;
var panoramUrl;
var preimage = null;

CANVAS_WIDTH = 1400,
CANVAS_HEIGHT = 600;

$(".panoramas.show").ready(init);

function init() {
    loadEnvironment();
    loadScene();
    loadPanorama();
    loadListeners();
    animate();
}

function loadEnvironment() {
    container = $('#panoramaContainer');
    renderer = new THREE.WebGLRenderer();
    raycaster = new THREE.Raycaster();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.sortObjects = false;
    container.append(renderer.domElement);
}

function loadScene() {
  // set up the scene
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(46.6, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);
  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var spotlight = new THREE.SpotLight(0xffffff);
  spotlight.position.set(0, 150, 0);
  spotlight.intensity = 1;
  scene.add(spotlight);

  scene.add(new THREE.AmbientLight(0xf4f5ec));
}

function drawPanorama(image) {
  cylinder = createMesh(new THREE.CylinderGeometry(70, 70, 70, 30, 8, true), image);
  cylinder.position.set(0, 0, 0);

  cylinder.rotateY(3.14 / 2);
  scene.add(cylinder);
}

function updatePanorama(image) {
	cylinder = createMesh(new THREE.CylinderGeometry(70, 70, 70, 30, 8, true), image);
	cylinder.position.set(0, 0, 0);
	cylinder.rotateY(3.14 / 2);
	cylinder.needsUpdate = true;
}

function drawBoxes(boxArray, type) {
    for (var i = 0; i < boxArray.length; i++) {
				console.log("i=" + i);
        var box = boxArray[i];

        var geometry = new THREE.BoxGeometry(box[0],              box[1], box[2]);
        var material = new THREE.MeshLambertMaterial({
            color: 0xe4e5f1,
            transparent: true,
            opacity: 0
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(box[4], box[5], box[3]);
        cube.rotateY(box[6]);
        cube.userData = {
            URL: box[7],
            type: type
        };
        scene.add(cube);
    }
}



function loadPanorama() {
		console.log("loading " + gon.image);
    var image = gon.image;
    var artArray = gon.art_array;
    var panArray = gon.pan_array;

    // console.log("image: " + image);
    // console.log("art array: " + artArray);
    // console.log("pan array: " + panArray);

    artArray = [
        [20, 20, 5, 70, 15, 5, 0.26, 'http://localhost:3000/museums/33/exhibitions/78/artworks/64/'],
    ];

    panArray = [
        [12, 17, 4, -70, 2, 5, 0, 'http://localhost:3000/panoramas/1']
    ];

		drawPanorama(image);
    drawBoxes(artArray, "art");
    drawBoxes(panArray, "pan");
}

function loadNewPanorama() {

}

function transition(newPanoramaUrl) {
		console.log("Here's the url: " + newPanoramaUrl);
    $.ajax({
        url: newPanoramaUrl,
        type: "POST",
    }).success( function(result) {
			console.log("success!");
			console.log(result.image);
			update(result.image);
		});
}

function update(textureUrl) {
    cylinder.material.map = new THREE.TextureLoader().load(textureUrl);
    cylinder.material.needsUpdate = true;
}

function createMesh(geom, imageFile) {
    var texture = new THREE.TextureLoader().load(imageFile);
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    mat.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh(geom, mat);

    return mesh;
}

function loadListeners() {
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', turnRight, false);
    document.addEventListener('keydown', turnLeft, false);
    document.addEventListener('keyup', stop, false);

    function onWindowResize() {
        camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / CANVAS_WIDTH) * 2 - 1;
        mouse.y = -((event.clientY-container.offset().top) / CANVAS_HEIGHT) * 2 + 1;
    }

    function onDocumentMouseDown(event) {
        var vector = new THREE.Vector3((event.clientX / CANVAS_WIDTH) * 2 - 1, -((event.clientY-container.offset().top) / CANVAS_HEIGHT) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 1) {
						var box = intersects[0].object
						if (box.userData.type == "art") {
							window.open(box.userData.URL);
						} else if (box.userData.type = "pan") {
							transition(box.userData.URL);
						}
        }
    }

    function turnRight(event) {
        if (event.keyCode === 39) { //right arrow key
            turningRight = true;
        }
    }

    function turnLeft(event) {
        if (event.keyCode === 37) { //left arrow key
            turningLeft = true;
        }
    }

    function stop(event) {
        turningRight = false;
        turningLeft = false;
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var turningRight = false;
var turningLeft = false;
function updateCameraObject() {
    if (turningRight) {
        camera.rotateY(-0.007);
    } else if (turningLeft) {
        camera.rotateY(0.007);
    }
}

function render() {
    updateCameraObject();
    camera.updateMatrixWorld();
    // find intersections
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.opacity = 0;

            INTERSECTED = intersects[0].object;
            INTERSECTED.material.opacity = 0.4;

        }
    } else {

        if (INTERSECTED) INTERSECTED.material.opacity = 0;

        INTERSECTED = null;

    }
    renderer.render(scene, camera);
}
