( function () {
    'use strict';

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
    var planeMaterial = planeMaterial || {};
    var material = material || {};
    var texturePlane = texturePlane || '';
    var textureShape = textureShape || {};
    var textureCylinder = textureCylinder || {};
    var textureCube = textureCube || {};
    var textureSphere = textureSphere || {};
    var territory = territory || {};
    var arrayExtrude = arrayExtrude || [];
    var shape = shape || {};
    var extrudeData = extrudeData || {};
    var extrudeGeometry = extrudeGeometry || {};
    var extrudeMesh = extrudeMesh || {};
    var cubeMesh = cubeMesh || {};
    var cylinderMesh = cylinderMesh || {};
    var sphereMesh = sphereMesh || {};
    var App = function (){
        return {
            initialize: function(){
                app.setRenderer();
                app.setScene();
                app.setCamera();
                app.addScene(camera);
                app.setGeometry();
                app.setControls();
            },
            setRenderer: function (){
                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.getElementById('render').appendChild( renderer.domElement );
            },
            setScene: function (){
                scene =  new THREE.Scene();
            },
            setCamera: function(){
                //field of view, radio, near and far clipping plane
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
                THREEx.WindowResize(renderer, camera);
                camera.position.z = 100;
                camera.position.y = -90;
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
            },
            addPlane: function(){
                // plane geometry
                planeGeometry = new THREE.PlaneGeometry(100,100,10,5);
                // texture
                texturePlane = new THREE.ImageUtils.loadTexture('img/texture.jpg');
                texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
                texturePlane.repeat.set(1,1);
                // material
                planeMaterial = new THREE.MeshBasicMaterial({map:texturePlane, side:THREE.DoubleSide});
                // creating plane
                territory = new THREE.Mesh(planeGeometry, planeMaterial);
                app.addScene(territory);
                app.animation();
            },
            animation: function(){
                requestAnimationFrame( app.animation );
                app.renderModel();
            },
            renderModel: function(){
                controls.update();
                //line.rotation.y = line.rotation.y + 0.01;
                app.render({scene:scene, camera:camera});
            },
            addFigure: function(x,y,z){
                vertices = [[2,7,0],[7,2,0],[12,7,0],[12,17,0],[7,12,0],[2,17,0],[2,7,0],[2,7,2],[7,2,2],[12,7,2],[12,17,2],[7,12,2],[2,17,2],[2,7,2]];
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
                textureShape = new THREE.ImageUtils.loadTexture('img/textureshape.jpg');
                textureShape.repeat.set(0.06, 0.06);
                textureShape.wrapS = textureShape.wrapT = THREE.repeatWrapping;
                // shape material
                material = new THREE.MeshBasicMaterial({map:textureShape, side: THREE.DoubleSide, wireframe: false});

                extrudeMesh = new THREE.Mesh(extrudeGeometry, material);

                pointsMaterial = new THREE.PointsMaterial({color:0xFF0000});
                line = new THREE.Line(geometry, pointsMaterial);
                //app.addScene(line);
                app.addScene(extrudeMesh);
                app.animation();
            },
            addCylinder: function(){
                // texture
                textureCylinder = new THREE.ImageUtils.loadTexture('img/texture6.png');
                textureCylinder.repeat.set(1, 1);
                textureCylinder.wrapS = textureCylinder.wrapT = THREE.repeatWrapping;
                // geometry
                cylinderGeometry = new THREE.CylinderGeometry(5,5,20,32);
                // material
                material = new THREE.MeshBasicMaterial({map:textureCylinder, side: THREE.DoubleSide, wireframe: false});
                // mesh
                cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
                // render
                app.addScene(cylinderMesh);
                app.animation();
            },
            addCube: function(){
                // texture
                textureCube = new THREE.ImageUtils.loadTexture('img/texture5.png');
                textureCube.repeat.set(0.6, 0.6);
                textureCube.wrapS = textureCube.wrapT = THREE.repeatWrapping;
                // geometry
                cubeGeometry = new THREE.CubeGeometry(10,10,10);
                // material
                material = new THREE.MeshBasicMaterial({map:textureCube, side: THREE.DoubleSide, wireframe: false});
                // mesh
                cubeMesh = new THREE.Mesh(cubeGeometry, material);
                // render
                app.addScene(cubeMesh);
                app.animation();
            },
            addSphere: function(){
                // texture
                textureSphere = new THREE.ImageUtils.loadTexture('img/texture7.jpeg');
                textureSphere.repeat.set(0.6, 0.6);
                textureSphere.wrapS = textureCube.wrapT = THREE.repeatWrapping;
                // geometry
                sphereGeometry = new THREE.SphereGeometry(10,10,10);
                // material
                material = new THREE.MeshBasicMaterial({map:textureSphere, side: THREE.DoubleSide, wireframe: false});
                // mesh
                sphereMesh = new THREE.Mesh(sphereGeometry, material);
                // render
                app.addScene(sphereMesh);
                app.animation();
            }
        }
    };
    app = new App();
    app.initialize();

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

})();