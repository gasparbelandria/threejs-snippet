define('cannonctrl', ['app', 'cannon', 'modernizr'], function (app, cannon, modernizr) {
    'use strict';

    app.controller('cannonController', ['$window', '$location', '$scope', 'variables', function($window, $location, $scope, variables){

        if (Modernizr.canvas){

            var app = app || {};
            var world, mass, body, shape, timeStep=1/60,
                camera, scene, renderer, geometry, material, mesh, scenes = [];

            var App = function () {
                return {
                    initCannon: function () {
                        world = new CANNON.World();
                        world.gravity.set(0,0,0);
                        world.broadphase = new CANNON.NaiveBroadphase();
                        world.solver.iterations = 10;
                        shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
                        mass = 1;
                        body = new CANNON.Body({
                            mass: 1
                        });
                        body.addShape(shape);
                        body.angularVelocity.set(0,10,0);
                        body.angularDamping = 0.5;
                        world.addBody(body);
                    },
                    initThree: function () {
                        scene = new THREE.Scene();
                        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
                        camera.position.z = 5;
                        scene.add( camera );
                        scenes.push(camera);
                        geometry = new THREE.BoxGeometry( 2, 2, 2 );
                        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
                        mesh = new THREE.Mesh( geometry, material );
                        scene.add( mesh );
                        scenes.push(mesh);
                        renderer = new THREE.WebGLRenderer();
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        $('#render_cannon').append( renderer.domElement );
                    },
                    animate: function () {
                        requestAnimationFrame( app.animate );
                        app.updatePhysics();
                        app.render();
                    },
                    updatePhysics: function () {
                        // Step the physics world
                        world.step(timeStep);
                        // Copy coordinates from Cannon.js to Three.js
                        mesh.position.copy(body.position);
                        mesh.quaternion.copy(body.quaternion);
                    },
                    render: function(){
                        renderer.render( scene, camera );
                    }
                }
            };

            app = new App();
            app.initThree();
            app.initCannon();
            app.animate();

            $scope.$on('$destroy', function() {
                App();
            });

        }else{
            console.error( 'canvas not supported' );
        }


    }]);

});

