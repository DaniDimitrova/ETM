// var container, stats;
// var camera, scene, raycaster, renderer;
// var mouse;
// var INTERSECTED;
// var radius = 100, theta = 0;
//
// var panoramUrl = $('.panorama_class').data('panorama');
//
// init();
// animate();
//
// init = function() {
//   mouse = new THREE.Vector2();
//
//   container = $('#panoramaContainer')[0];
//   scene = new THREE.Scene();
//
//   camera = new THREE.PerspectiveCamera(46.6, window.innerWidth / window.innerHeight, 0.1, 1000);
//
//   camera.position.x = 0;
//   camera.position.y = 0;
//   camera.position.z = 0;
//   camera.lookAt(new THREE.Vector3(0, 0, 0 ));
//
//   var spotLight = new THREE.SpotLight(0xffffff);
//   spotLight.position.set(0, 150, 0);
//   spotLight.intensity = 1;
//   scene.add(spotLight);
//
//   var ambiLight = new THREE.AmbientLight(0xf4f5ec);
//   scene.add(ambiLight);
//
//   var boxArray = [
//     [12 ,17, 4, -70, 2, 5, 0, 'https://www.google.com/'],
//     [20, 20, 5, 70, 15, 5, 0.26],
//   ];
//
//   for (var i = 0; i <= 1; i++) {
//     var geometry = new THREE.BoxGeometry( boxArray[i][0], boxArray[i][1], boxArray[i][2] );
//     var material = new THREE.MeshLambertMaterial({color: 0xe4e5f1, transparent: true, opacity: 0});
//     var cube = new THREE.Mesh( geometry, material );
//     cube.position.z = boxArray[i][3];
//     cube.position.x = boxArray[i][4];
//     cube.position.y = boxArray[i][5];
//     cube.rotateY(boxArray[i][6]);
//     cube.userData = { URL: boxArray[i][7]};
//     scene.add( cube );
//   }
//
//   document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//   document.addEventListener('mousedown', onDocumentMouseDown, false);
//   window.addEventListener( 'resize', onWindowResize, false );
//   document.addEventListener('keydown', turnRight, false);
//   document.addEventListener('keydown', turnLeft, false);
//   document.addEventListener('keyup', stop, false);
// });
//
// $('.panorama_class').change(function() {
//   var cylinder = createMesh(new THREE.CylinderGeometry(70, 70, 70, 30, 8, true), panoramUrl);
//
//   cylinder.position.x = 0;
//   cylinder.position.y = 0;
//   cylinder.position.z = 0;
//   cylinder.rotateY(3.14/2);
//
//   scene.add(cylinder);
//
//   function createMesh(geom, imageFile) {
//      var texture = THREE.ImageUtils.loadTexture(imageFile);
//      var mat = new THREE.MeshPhongMaterial();
//      mat.map = texture;
//      mat.side = THREE.DoubleSide;
//      var mesh = new THREE.Mesh(geom, mat);
//      return mesh;
//   }
//
//   raycaster = new THREE.Raycaster();
//   renderer = new THREE.WebGLRenderer();
//
//   renderer.setClearColor( 0xf0f0f0 );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   renderer.sortObjects = false;
//   container.append(renderer.domElement);
// });
//
// function onWindowResize() {
//
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize( window.innerWidth, window.innerHeight );
//
// }
//
// function onDocumentMouseMove( event ) {
//
//   event.preventDefault();
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//
// }
//
// function onDocumentMouseDown(event) {
//
//     var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
//     vector = vector.unproject(camera);
//
//     var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
//
//     var intersects = raycaster.intersectObjects(scene.children);
//
//     if (intersects.length > 1) {
//
//         console.log(intersects[0].object.userData);
//         //
//         // if (intersects[0].object == cube){
//         // 	window.open('/panoramaTest.html');
//         // } else {
//         // 	window.open('http://www.google.com');
//         // }
//
//         var url = window.open(intersects[0].object.userData.URL);
//
//         if (url == null) {
//           requestNewPanorama();
//         } else {
//           window.open(intersects[0].object.userData.URL);
//         }
//
//
//
//
//
//         //window.location.href = 'http://www.google.com';
//
//     }
// }
//
// var turningRight = false;
// var turningLeft = false;
//
// function updateCameraObject(){
//
//   if (turningRight) {
//     camera.rotateY(-0.007);
//   } else if (turningLeft){
//     camera.rotateY(0.007);
//   }
//
// }
//
// function turnRight(event) {
//     if (event.keyCode === 39) { //right arrow key
//     turningRight = true;
//
//     }
// }
//
// function turnLeft(event) {
//     if (event.keyCode === 37) { //left arrow key
//     turningLeft=true;
//     }
// }
//
// function stop(event){
//   turningRight = false;
//   turningLeft = false;
// }
//
//
// function animate() {
//
//   requestAnimationFrame( animate );
//   render();
//
// }
//
// function render() {
//   updateCameraObject();
//   camera.updateMatrixWorld();
//   // find intersections
//   raycaster.setFromCamera( mouse, camera );
//   var intersects = raycaster.intersectObjects( scene.children );
//   if ( intersects.length > 0 ) {
//     if ( INTERSECTED != intersects[ 0 ].object ) {
//
//       if ( INTERSECTED ) INTERSECTED.material.opacity = 0;
//
//       INTERSECTED = intersects[ 0 ].object;
//       INTERSECTED.material.opacity = 0.4;
//
//
//     }
//   } else {
//
//     if ( INTERSECTED ) INTERSECTED.material.opacity = 0;
//
//     INTERSECTED = null;
//
//   }
//
//   renderer.render( scene, camera );
//
// }
