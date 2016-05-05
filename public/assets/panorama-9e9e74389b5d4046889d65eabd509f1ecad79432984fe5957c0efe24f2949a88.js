function init(){function e(){H=$("#panoramaContainer"),l=new THREE.WebGLRenderer,T=new THREE.Raycaster,l.setClearColor(15790320),l.setSize(CANVAS_WIDTH,CANVAS_HEIGHT),l.sortObjects=!1,H.append(l.domElement)}function t(){f=new THREE.Scene,A=new THREE.PerspectiveCamera(46.6,CANVAS_WIDTH/CANVAS_HEIGHT,.1,1e3),A.position.set(0,0,0),A.lookAt(new THREE.Vector3(0,0,0));var e=new THREE.SpotLight(16777215);e.position.set(0,150,0),e.intensity=1,f.add(e),f.add(new THREE.AmbientLight(16053740))}function n(e){m=s(new THREE.CylinderGeometry(70,70,70,30,8,!0),e),m.position.set(0,0,0),m.rotateY(1.57),f.add(m)}function a(e){var t=new THREE.MeshLambertMaterial({color:15001073,transparent:!0,opacity:.3}),n=new THREE.MeshLambertMaterial({color:15001073,transparent:!0,opacity:.3}),a=THREE.SceneUtils.createMultiMaterialObject(e,[t,n]);return a}function r(e,t){for(var n in e){var r=e[n],o=a(new THREE.SphereGeometry(r[3],30,30));o.position.x=r[0],o.position.y=r[1],o.position.z=r[2],f.add(o),o.userData={URL:r[4],type:t},f.add(o)}}function o(){n(gon.image),r(gon.art_array,"art"),r(gon.pan_array,"pan")}function i(e){$.ajax({url:e,type:"GET"}).success(function(e){console.log(e),c(e.image,e.art_array,e.pan_array)})}function c(e,t,n){for(var a=f.children.length-1;a>=3;a--)f.remove(f.children[a]);m.material.map=(new THREE.TextureLoader).load(e),m.material.needsUpdate=!0,r(t,"art"),r(n,"pan")}function s(e,t){var n=(new THREE.TextureLoader).load(t),a=new THREE.MeshPhongMaterial;a.map=n,a.side=THREE.DoubleSide;var r=new THREE.Mesh(e,a);return r}function d(){function e(){A.aspect=CANVAS_WIDTH/CANVAS_HEIGHT,A.updateProjectionMatrix(),l.setSize(CANVAS_WIDTH,CANVAS_HEIGHT)}function t(e){e.preventDefault(),w.x=e.clientX/CANVAS_WIDTH*2-1,w.y=2*-((e.clientY-H.offset().top)/CANVAS_HEIGHT)+1}function n(e){var t=new THREE.Vector3(e.clientX/CANVAS_WIDTH*2-1,2*-((e.clientY-H.offset().top)/CANVAS_HEIGHT)+1,.5);t=t.unproject(A);var n=new THREE.Raycaster(A.position,t.sub(A.position).normalize()),a=n.intersectObjects(f.children,!0);if(a.length>1){var r=a[0].object.parent;"art"==r.userData.type?window.open(r.userData.URL):"pan"==r.userData.type&&i(r.userData.URL)}}function a(e){39===e.keyCode&&(R=!0)}function r(e){37===e.keyCode&&(v=!0)}function o(){R=!1,v=!1}document.addEventListener("mousemove",t,!1),document.addEventListener("mousedown",n,!1),window.addEventListener("resize",e,!1),document.addEventListener("keydown",a,!1),document.addEventListener("keydown",r,!1),document.addEventListener("keyup",o,!1)}function E(){requestAnimationFrame(E),p()}function u(){R?A.rotateY(-.007):v&&A.rotateY(.007)}function p(){u(),A.updateMatrixWorld(),T.setFromCamera(w,A);var e=T.intersectObjects(f.children,!0);e.length>0?y!=e[0].object&&(y&&(y.material.opacity=0),y=e[0].object,y.material.opacity=.4):(y&&(y.material.opacity=0),y=null),l.render(f,A)}var H,l,T,m,A,f,y,w=new THREE.Vector2;CANVAS_WIDTH=1400,CANVAS_HEIGHT=600;var R=!1,v=!1;e(),t(),o(),d(),E()}$(".panoramas.show").ready(init);