define('appctrl', ['app', 'variables', 'modernizr', 'threejs', 'threexResize', 'threexKeyboard', 'threexFirstpersoncontrol', 'orbitControls', 'domEvents'], function (app, variables, modernizr, threejs, threexResize, threexKeyboard, threexFirstpersoncontrol, orbitControls, domEvents) {

    'use strict';

    app.controller('appController', ['$window', '$location', '$scope', 'variables', '$rootScope', function($window, $location, $scope, variables, $rootScope){

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
            var raycaster = new THREE.Raycaster();
            var mouseVector = new THREE.Vector3();

            var mouse = new THREE.Vector3();

            var objects = [];
            var scenes = [];

            var domEvents = {};

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
                        //renderer = new THREE.CanvasRenderer();
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        renderer.shadowMapEnabled = true;
                        $('#render_basics').append( renderer.domElement );
                    },

                    setScene: function (){
                        scene =  new THREE.Scene();
                    },

                    setCamera: function(){
                        //field of view, radio, near and far clipping plane
                        camera = new THREE.PerspectiveCamera( variables.camera.view_angle, variables.camera.aspect, variables.camera.near, variables.camera.far );
                        THREEx.WindowResize(renderer, camera);
                        camera.position.x = variables.camera.position.x;
                        camera.position.y = variables.camera.position.y;
                        camera.position.z = variables.camera.position.z;

                    },

                    setGeometry: function(){
                        geometry = new THREE.Geometry();
                    },

                    addScene: function(obj){
                        scene.add(obj);
                        scenes.push(obj);
                    },

                    render: function(obj){
                        renderer.render(obj.scene, obj.camera);
                    },

                    setControls: function(){
                        controls = new THREE.OrbitControls(camera, renderer.domElement);
                        domEvents = new THREEx.DomEvents(camera, renderer.domElement)

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
                            variables.primitives.plane.width,
                            variables.primitives.plane.height,
                            variables.primitives.plane.widthSegments,
                            variables.primitives.plane.heightSegments);
                        // texture
                        texturePlane = new THREE.ImageUtils.loadTexture(variables.primitives.plane.texture);
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
                        vertices = variables.primitives.figure.vertices;
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
                        textureShape = new THREE.ImageUtils.loadTexture(variables.primitives.figure.texture);
                        textureShape.repeat.set(0.06, 0.06);
                        textureShape.wrapS = textureShape.wrapT = THREE.repeatWrapping;
                        // shape material
                        material = new THREE.MeshBasicMaterial({map:textureShape, side: THREE.DoubleSide, wireframe: false});

                        extrudeMesh = new THREE.Mesh(extrudeGeometry, material);

                        pointsMaterial = new THREE.PointsMaterial({color:0xFF0000});
                        extrudeMesh.position.x = variables.primitives.figure.position.x;
                        extrudeMesh.position.y = variables.primitives.figure.position.y;
                        extrudeMesh.position.z = variables.primitives.figure.position.z;
                        extrudeMesh.name = 'extrudeMesh';
                        app.addScene(extrudeMesh);
                        app.animation();
                        objects.push(extrudeMesh);
                    },

                    addCylinder: function(){
                        // texture
                        textureCylinder = new THREE.ImageUtils.loadTexture(variables.primitives.cylinder.texture);
                        textureCylinder.repeat.set(1, 1);
                        textureCylinder.wrapS = textureCylinder.wrapT = THREE.repeatWrapping;
                        // geometry
                        cylinderGeometry = new THREE.CylinderGeometry(
                            variables.primitives.cylinder.radiusTop,
                            variables.primitives.cylinder.radiusBottom,
                            variables.primitives.cylinder.height,
                            variables.primitives.cylinder.radiusSegments,
                            variables.primitives.cylinder.heightSegments,
                            variables.primitives.cylinder.openEnded,
                            variables.primitives.cylinder.thetaStart,
                            variables.primitives.cylinder.thetaLength);
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureCylinder, side: THREE.DoubleSide, wireframe: false});
                        // mesh
                        cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
                        cylinderMesh.position.x = variables.primitives.cylinder.position.x;
                        cylinderMesh.position.y = variables.primitives.cylinder.position.y;
                        cylinderMesh.position.z = variables.primitives.cylinder.position.z;
                        cylinderMesh.name = 'cylinderMesh';
                        cylinderMesh.callback = function() { console.log( this.name ); }
                        // render
                        app.addScene(cylinderMesh);
                        app.animation();
                        objects.push(cylinderMesh);
                    },

                    addCube: function(){
                        // texture
                        textureCube = new THREE.ImageUtils.loadTexture(variables.primitives.cube.texture);
                        textureCube.repeat.set(0.6, 0.6);
                        textureCube.wrapS = textureCube.wrapT = THREE.repeatWrapping;
                        // geometry
                        cubeGeometry = new THREE.CubeGeometry(
                            variables.primitives.cube.width,
                            variables.primitives.cube.height,
                            variables.primitives.cube.depth,
                            variables.primitives.cube.widthSegments,
                            variables.primitives.cube.heightSegments,
                            variables.primitives.cube.depthSegments
                        );
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureCube, side: THREE.DoubleSide, wireframe: false});
                        // mesh
                        cubeMesh = new THREE.Mesh(cubeGeometry, material);
                        cubeMesh.position.x = variables.primitives.cube.position.x;
                        cubeMesh.position.y = variables.primitives.cube.position.y;
                        cubeMesh.position.z = variables.primitives.cube.position.z;
                        cubeMesh.name = 'cubeMesh';
                        // render
                        app.addScene(cubeMesh);
                        app.animation();
                        objects.push(cubeMesh);
                    },

                    addSphere: function(){
                        // texture
                        textureSphere = new THREE.ImageUtils.loadTexture(variables.primitives.sphere.texture);
                        textureSphere.repeat.set(1, 1);
                        textureSphere.wrapS = textureSphere.wrapT = THREE.repeatWrapping;
                        // geometry
                        sphereGeometry = new THREE.SphereGeometry(variables.primitives.sphere.radius,variables.primitives.sphere.segments,variables.primitives.sphere.rings);
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureSphere, side: THREE.DoubleSide, wireframe: false});
                        // mesh
                        sphereMesh = new THREE.Mesh(sphereGeometry, material);
                        sphereMesh.position.x = variables.primitives.sphere.position.x;
                        sphereMesh.position.y = variables.primitives.sphere.position.y;
                        sphereMesh.position.z = variables.primitives.sphere.position.z;
                        sphereMesh.name = 'sphereMesh';
                        // render
                        app.addScene(sphereMesh);
                        app.animation();
                        objects.push(sphereMesh);
                    },

                    addCircle: function(){
                        // texture
                        textureCircle = new THREE.ImageUtils.loadTexture(variables.primitives.circle.texture);
                        textureCircle.repeat.set(1, 1);
                        textureCircle.wrapS = textureCircle.wrapT = THREE.repeatWrapping;
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureCircle, side: THREE.DoubleSide, wireframe: false});
                        // geometry
                        circleGeometry = new THREE.CircleGeometry(
                            variables.primitives.circle.radius,
                            variables.primitives.circle.segments,
                            variables.primitives.circle.thetaStart,
                            variables.primitives.circle.thetaLength);
                        // mesh
                        circleMesh =  new THREE.Mesh(circleGeometry, material);
                        circleMesh.position.x = variables.primitives.circle.position.x;
                        circleMesh.position.y = variables.primitives.circle.position.y;
                        circleMesh.position.z = variables.primitives.circle.position.z;
                        circleMesh.name = 'circleMesh';
                        app.addScene(circleMesh);
                        app.animation();
                        objects.push(circleMesh);
                    },

                    addTorus: function(){
                        // texture
                        textureTorus = new THREE.ImageUtils.loadTexture(variables.primitives.torus.texture);
                        textureTorus.repeat.set(0.06, 0.06);
                        textureTorus.wrapS = textureTorus.wrapT = THREE.repeatWrapping;
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureTorus, side: THREE.DoubleSide, wireframe: false});
                        // geometry
                        torusGeometry = new THREE.TorusGeometry(
                            variables.primitives.torus.radius,
                            variables.primitives.torus.tube,
                            variables.primitives.torus.radialSegments,
                            variables.primitives.torus.tubularSegments,
                            variables.primitives.torus.arc
                        );
                        // mesh
                        torusMesh = new THREE.Mesh(torusGeometry, material);
                        torusMesh.position.x = variables.primitives.torus.position.x;
                        torusMesh.position.y = variables.primitives.torus.position.y;
                        torusMesh.position.z = variables.primitives.torus.position.z;
                        torusMesh.name = 'torusMesh';
                        app.addScene(torusMesh);
                        app.animation();
                        objects.push(torusMesh);

                    },

                    addTorusKnot: function(){
                        // texture
                        textureTorusKnot = new THREE.ImageUtils.loadTexture(variables.primitives.torusknot.texture);
                        textureTorusKnot.repeat.set(0.05, 0.05);
                        textureTorusKnot.wrapS = textureTorusKnot.wrapT = THREE.repeatWrapping;
                        // material
                        material = new THREE.MeshBasicMaterial({map:textureTorusKnot, side: THREE.DoubleSide, wireframe: false});
                        // geometry
                        torusKnotGeometry = new THREE.TorusKnotGeometry(
                            variables.primitives.torusknot.radius,
                            variables.primitives.torusknot.tube,
                            variables.primitives.torusknot.radialSegments,
                            variables.primitives.torusknot.tubularSegments,
                            variables.primitives.torusknot.p,
                            variables.primitives.torusknot.q,
                            variables.primitives.torusknot.heightScale
                        );
                        //mesh
                        torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
                        torusKnotMesh.position.x = variables.primitives.torusknot.position.x;
                        torusKnotMesh.position.y = variables.primitives.torusknot.position.y;
                        torusKnotMesh.position.z = variables.primitives.torusknot.position.z;
                        torusKnotMesh.name = 'torusKnotMesh';

                        torusKnotMesh.addEventListener('click', function(){
                            torusKnotMesh.scale.x *= 2;
                        });

                        app.addScene(torusKnotMesh);
                        app.animation();
                        objects.push(torusKnotMesh);
                    }
                }
            };

            app = new App();
            app.initialize();
            app.addPlane();
            app.addTorusKnot();
            app.addCircle();
            app.addCube();
            app.addCylinder();
            app.addFigure();
            app.addTorus();
            app.addSphere();


            $('#render').mousedown(function(event){
                event.preventDefault();
                domEvents.addEventListener(torusKnotMesh, 'click', function(event){
                    torusKnotMesh.scale.x *= 2;
                }, false)
            });

            $scope.$on('$destroy', function() {
                var len = scenes.length, i = 0;
                for (; i < len; i++){
                    scene.remove( scenes[i] );
                }

                //geometry.dispose();
                //material.dispose();
                //texture.dispose();

            });


            //$rootScope.$on('$stateChangeStart',
            //    function(event, toState, toParams, fromState, fromParams){
            //    })

        }else{
            console.error('canvas not supported');
        }


    }]);

});

