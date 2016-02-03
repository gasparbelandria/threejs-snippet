'use strict'

app.controller('AppCtrl', ['$window', '$location', '$scope', 'global', function($window, $location, $scope, global){

    if (Modernizr.canvas){
        var app = app || {};
        var renderer = renderer || {};
        var scene = scene || {};
        var camera = camera || {};
        var geometry = geometry || {};
        var elVector = elVector || {};
        var pointsMaterial = pointsMaterial || {};
        var points = points || {};
        var vertices = vertices || [];
        var line = line || {};
        var controls = controls || {};

        var planeGeometry = planeGeometry || {};
        var cubeGeometry = cubeGeometry || {};
        var cylinderGeometry = cylinderGeometry || {};
        var sphereGeometry = sphereGeometry || {};
        var circleGeometry = circleGeometry || {};
        var extrudeGeometry = extrudeGeometry || {};
        var torusGeometry = torusGeometry || {};
        var torusKnotGeometry = torusKnotGeometry || {};

        var planeMaterial = planeMaterial || {};
        var material = material || {};

        var texturePlane = texturePlane || '';
        var textureShape = textureShape || {};
        var textureCylinder = textureCylinder || {};
        var textureCube = textureCube || {};
        var textureSphere = textureSphere || {};
        var textureCircle = textureCircle || {};
        var textureTorus = textureTorus || {};
        var textureTorusKnot = textureTorusKnot || {};

        var territory = territory || {};
        var arrayExtrude = arrayExtrude || [];
        var shape = shape || {};
        var extrudeData = extrudeData || {};

        var extrudeMesh = extrudeMesh || {};
        var cubeMesh = cubeMesh || {};
        var cylinderMesh = cylinderMesh || {};
        var sphereMesh = sphereMesh || {};
        var circleMesh = circleMesh || {};
        var torusMesh = torusMesh || {};
        var torusKnotMesh = torusKnotMesh || {};

        var keyboard = new THREEx.KeyboardState();
        var _clock = _clock || {};
        var _delta = _delta || {};
        var pointLight = pointLight || {};

        var App = function (){
            return {

                initialize: function(){
                    app.setRenderer();
                    app.setScene();
                    app.setCamera();
                    app.addScene(camera);
                    app.setGeometry();
                    app.setControls();
                    app.addPointLight();
                    app.addArrowHelper();
                },

                setRenderer: function (){
                    renderer = new THREE.WebGLRenderer();
                    renderer.setSize( window.innerWidth, window.innerHeight );
                    renderer.shadowMapEnabled = true;
                    $('#render').append( renderer.domElement );
                },

                setScene: function (){
                    scene =  new THREE.Scene();
                },

                setCamera: function(){
                    //field of view, radio, near and far clipping plane
                    camera = new THREE.PerspectiveCamera( global.camera.view_angle, global.camera.aspect, global.camera.near, global.camera.far );
                    THREEx.WindowResize(renderer, camera);
                    camera.position.x = global.camera.position.x;
                    camera.position.y = global.camera.position.y;
                    camera.position.z = global.camera.position.z;

                },

                setGeometry: function(){
                    geometry = new THREE.Geometry();
                },

                addScene: function(obj){
                    scene.add(obj);
                },

                render: function(obj){
                    renderer.render(obj.scene, obj.camera);
                },

                setControls: function(){
                    controls = new THREE.OrbitControls(camera, renderer.domElement);

                    // FirstPersonControls
                    //controls = new THREE.FirstPersonControls( camera );
                    //controls.lookSpeed = 0.1;
                    //controls.movementSpeed = 100;
                    //controls.lookVertical = true;
                    //controls.activeLook = true;
                },

                addPointLight: function(){
                    var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
                    pointLight.position.set( 10, 10, 10 );
                    scene.add( pointLight );
                    var sphereSize = 1;
                    var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
                    app.addScene(pointLightHelper);
                    app.animation();

                },

                addArrowHelper: function(){
                    var origin = new THREE.Vector3( 0, 0, 0 );
                    var dir = new THREE.Vector3( 1, 0, 0 );
                    var length = 100;
                    var hex = 0xffff00;
                    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                    app.addScene(arrowHelper);
                    app.animation();
                    //
                    var origin = new THREE.Vector3( 0, 0, 0 );
                    var dir = new THREE.Vector3( 0, 1, 0 );
                    var length = 100;
                    var hex = 0xff0000;
                    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                    app.addScene(arrowHelper);
                    app.animation();
                    //
                    var origin = new THREE.Vector3( 0, 0, 0 );
                    var dir = new THREE.Vector3( 0, 0, 1 );
                    var length = 100;
                    var hex = 0x0000ff;
                    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                    app.addScene(arrowHelper);
                    app.animation();
                },

                addPlane: function(){
                    // plane geometry
                    planeGeometry = new THREE.PlaneGeometry(
                        global.primitives.plane.width,
                        global.primitives.plane.height,
                        global.primitives.plane.widthSegments,
                        global.primitives.plane.heightSegments);
                    // texture
                    texturePlane = new THREE.ImageUtils.loadTexture(global.primitives.plane.texture);
                    texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
                    texturePlane.repeat.set(1,1);
                    // material
                    planeMaterial = new THREE.MeshBasicMaterial({map:texturePlane, side:THREE.DoubleSide});
                    // creating plane
                    territory = new THREE.Mesh(planeGeometry, planeMaterial);
                    territory.rotation.x = Math.PI/2;
                    territory.receiveShadow = true;
                    app.addScene(territory);
                    app.animation();
                },

                animation: function(){
                    requestAnimationFrame( app.animation );
                    _clock = new THREE.Clock();
                    app.renderModel();

                    var setTime = 0.001;
                    var setDistance = 100;
                    var setTrack = setDistance * setTime;

                    if (keyboard.pressed('up')) {
                        torusKnotMesh.position.z+=setTrack;
                    }

                    if (keyboard.pressed('down')) {
                        torusKnotMesh.position.z-=setTrack;
                    }

                    if (keyboard.pressed('left')) {
                        torusKnotMesh.position.x+=setTrack;
                    }

                    if (keyboard.pressed('right')) {
                        torusKnotMesh.position.x-=setTrack;
                    }

                    // OrbitControls Camera
                    // controls.target.set(torusKnotMesh.position.x,torusKnotMesh.position.y,torusKnotMesh.position.z);
                },

                renderModel: function(){
                    _delta = _clock.getDelta();
                    controls.update(); // (_delta)
                    app.render({scene:scene, camera:camera});
                },

                addFigure: function(x,y,z){
                    vertices = global.primitives.figure.vertices;
                    var long_vertices = vertices.length;
                    var i = 0;
                    var x, y, z;
                    for (; i < long_vertices; i++){
                        x = vertices[i][0];
                        y = vertices[i][1];
                        z = vertices[i][2];
                        elVector = new THREE.Vector3(x,y,z);
                        geometry.vertices.push(elVector);
                        arrayExtrude.push(elVector);
                    }
                    shape = new THREE.Shape(arrayExtrude);
                    extrudeData = {
                        amount: 10,
                        bevelEnabled: false,
                        bevelSegment: 1,
                        steps: 10,
                        bevelThickess: 100

                    };

                    // geometry
                    extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeData);
                    extrudeMesh = new THREE.Mesh(extrudeGeometry);
                    // texture
                    textureShape = new THREE.ImageUtils.loadTexture(global.primitives.figure.texture);
                    textureShape.repeat.set(0.06, 0.06);
                    textureShape.wrapS = textureShape.wrapT = THREE.repeatWrapping;
                    // shape material
                    material = new THREE.MeshBasicMaterial({map:textureShape, side: THREE.DoubleSide, wireframe: false});

                    extrudeMesh = new THREE.Mesh(extrudeGeometry, material);

                    pointsMaterial = new THREE.PointsMaterial({color:0xFF0000});
                    extrudeMesh.position.x = global.primitives.figure.position.x;
                    extrudeMesh.position.y = global.primitives.figure.position.y;
                    extrudeMesh.position.z = global.primitives.figure.position.z;
                    app.addScene(extrudeMesh);
                    app.animation();
                },

                addCylinder: function(){
                    // texture
                    textureCylinder = new THREE.ImageUtils.loadTexture(global.primitives.cylinder.texture);
                    textureCylinder.repeat.set(1, 1);
                    textureCylinder.wrapS = textureCylinder.wrapT = THREE.repeatWrapping;
                    // geometry
                    cylinderGeometry = new THREE.CylinderGeometry(
                        global.primitives.cylinder.radiusTop,
                        global.primitives.cylinder.radiusBottom,
                        global.primitives.cylinder.height,
                        global.primitives.cylinder.radiusSegments,
                        global.primitives.cylinder.heightSegments,
                        global.primitives.cylinder.openEnded,
                        global.primitives.cylinder.thetaStart,
                        global.primitives.cylinder.thetaLength);
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureCylinder, side: THREE.DoubleSide, wireframe: false});
                    // mesh
                    cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
                    cylinderMesh.position.x = global.primitives.cylinder.position.x;
                    cylinderMesh.position.y = global.primitives.cylinder.position.y;
                    cylinderMesh.position.z = global.primitives.cylinder.position.z;
                    // render
                    app.addScene(cylinderMesh);
                    app.animation();
                },

                addCube: function(){
                    // texture
                    textureCube = new THREE.ImageUtils.loadTexture(global.primitives.cube.texture);
                    textureCube.repeat.set(0.6, 0.6);
                    textureCube.wrapS = textureCube.wrapT = THREE.repeatWrapping;
                    // geometry
                    cubeGeometry = new THREE.CubeGeometry(
                        global.primitives.cube.width,
                        global.primitives.cube.height,
                        global.primitives.cube.depth,
                        global.primitives.cube.widthSegments,
                        global.primitives.cube.heightSegments,
                        global.primitives.cube.depthSegments
                    );
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureCube, side: THREE.DoubleSide, wireframe: false});
                    // mesh
                    cubeMesh = new THREE.Mesh(cubeGeometry, material);
                    cubeMesh.position.x = global.primitives.cube.position.x;
                    cubeMesh.position.y = global.primitives.cube.position.y;
                    cubeMesh.position.z = global.primitives.cube.position.z;
                    // render
                    app.addScene(cubeMesh);
                    app.animation();
                },

                addSphere: function(){
                    // texture
                    textureSphere = new THREE.ImageUtils.loadTexture(global.primitives.sphere.texture);
                    textureSphere.repeat.set(1, 1);
                    textureSphere.wrapS = textureSphere.wrapT = THREE.repeatWrapping;
                    // geometry
                    sphereGeometry = new THREE.SphereGeometry(global.primitives.sphere.radius,global.primitives.sphere.segments,global.primitives.sphere.rings);
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureSphere, side: THREE.DoubleSide, wireframe: false});
                    // mesh
                    sphereMesh = new THREE.Mesh(sphereGeometry, material);
                    sphereMesh.position.x = global.primitives.sphere.position.x;
                    sphereMesh.position.y = global.primitives.sphere.position.y;
                    sphereMesh.position.z = global.primitives.sphere.position.z;
                    // render
                    app.addScene(sphereMesh);
                    app.animation();
                },

                addCircle: function(){
                    // texture
                    textureCircle = new THREE.ImageUtils.loadTexture(global.primitives.circle.texture);
                    textureCircle.repeat.set(1, 1);
                    textureCircle.wrapS = textureCircle.wrapT = THREE.repeatWrapping;
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureCircle, side: THREE.DoubleSide, wireframe: false});
                    // geometry
                    circleGeometry = new THREE.CircleGeometry(
                        global.primitives.circle.radius,
                        global.primitives.circle.segments,
                        global.primitives.circle.thetaStart,
                        global.primitives.circle.thetaLength);
                    // mesh
                    circleMesh =  new THREE.Mesh(circleGeometry, material);
                    circleMesh.position.x = global.primitives.circle.position.x;
                    circleMesh.position.y = global.primitives.circle.position.y;
                    circleMesh.position.z = global.primitives.circle.position.z;
                    app.addScene(circleMesh);
                    app.animation();
                },

                addTorus: function(){
                    // texture
                    textureTorus = new THREE.ImageUtils.loadTexture(global.primitives.torus.texture);
                    textureTorus.repeat.set(0.06, 0.06);
                    textureTorus.wrapS = textureTorus.wrapT = THREE.repeatWrapping;
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureTorus, side: THREE.DoubleSide, wireframe: false});
                    // geometry
                    torusGeometry = new THREE.TorusGeometry(
                        global.primitives.torus.radius,
                        global.primitives.torus.tube,
                        global.primitives.torus.radialSegments,
                        global.primitives.torus.tubularSegments,
                        global.primitives.torus.arc
                    );
                    // mesh
                    torusMesh = new THREE.Mesh(torusGeometry, material);
                    torusMesh.position.x = global.primitives.torus.position.x;
                    torusMesh.position.y = global.primitives.torus.position.y;
                    torusMesh.position.z = global.primitives.torus.position.z;
                    app.addScene(torusMesh);
                    app.animation();

                },

                addTorusKnot: function(){
                    // texture
                    textureTorusKnot = new THREE.ImageUtils.loadTexture(global.primitives.torusknot.texture);
                    textureTorusKnot.repeat.set(0.05, 0.05);
                    textureTorusKnot.wrapS = textureTorusKnot.wrapT = THREE.repeatWrapping;
                    // material
                    material = new THREE.MeshBasicMaterial({map:textureTorusKnot, side: THREE.DoubleSide, wireframe: false});
                    // geometry
                    torusKnotGeometry = new THREE.TorusKnotGeometry(
                        global.primitives.torusknot.radius,
                        global.primitives.torusknot.tube,
                        global.primitives.torusknot.radialSegments,
                        global.primitives.torusknot.tubularSegments,
                        global.primitives.torusknot.p,
                        global.primitives.torusknot.q,
                        global.primitives.torusknot.heightScale
                    );
                    //mesh
                    torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
                    torusKnotMesh.position.x = global.primitives.torusknot.position.x;
                    torusKnotMesh.position.y = global.primitives.torusknot.position.y;
                    torusKnotMesh.position.z = global.primitives.torusknot.position.z;
                    app.addScene(torusKnotMesh);
                    app.animation();
                }

            }
        };

        app = new App();
        console.time('init');
        app.initialize();
        console.timeEnd('init');
        app.addTorusKnot();
        app.addPlane();

        $('#plane').click(function(){
            app.addPlane();
        });

        $('#figure').click(function(){
            app.addFigure();
        });

        $('#cube').click(function(){
            app.addCube();
        });

        $('#cylinder').click(function(){
            app.addCylinder();
        });

        $('#sphere').click(function(){
            app.addSphere();
        });

        $('#circle').click(function(){
            app.addCircle();
        });

        $('#torus').click(function(){
            app.addTorus();
        });

        $('#torusknot').click(function(){
            app.addTorusKnot();
        });

        torusKnotMesh.addEventListener('click', function(){
            console.log('clicked torusKnotMesh');
        })

    }else{
        console.error('canvas not supported');
    }


}]);