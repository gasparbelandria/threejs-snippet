define('quaternionctrl', ['app', 'modernizr'], function (app, modernizr) {
    'use strict';

    app.controller('quaternionController', ['$window', '$location', '$scope', function($window, $location, $scope){

        if (Modernizr.canvas){
            var app = app || {};
            var renderer, scene, camera;
            var scenes = scenes || [];
            var goLeft = false
            var goRight = false
            var goUp = false
            var goDown = false
            var rotationx = 0;
            var rotationy = 0;
            var rotationz = 0;
            var airplane = {};
            var _q1 = new THREE.Quaternion();
            var axisX = new THREE.Vector3( 1, 0, 0 );
            var axisZ = new THREE.Vector3( 0, 0, 1 );

            var axes = {};
            var cubeMaterial = {};
            var cube = {};

            var App = function () {
                return {
                    init: function () {
                        airplane = new THREE.Object3D();
                        airplane.useQuaternion = true; // CHANGED
                        // renderer
                        renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );
                        renderer.setSize( window.innerWidth, window.innerHeight );
                        $('#render_quaternion').append( renderer.domElement );
                        // scene
                        scene = new THREE.Scene();
                        //camera
                        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
                        camera.position.z = 400;
                        axes = new THREE.AxisHelper();
                        airplane.add( axes );
                        cubeMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffabe4, color: 0xace3ff, specular: 0xffabe4, shininess: 0, perPixel: true, metal: true } );
                        cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshNormalMaterial() );
                        airplane.add(cube);
                        scene.add(airplane);
                    },
                    animate: function () {
                        requestAnimationFrame( app.animate );
                        app.render();
                    },
                    render: function () {
                        if(goLeft)
                            app.rotateOnAxis( airplane, axisZ, 0.08 );

                        if(goRight)
                            app.rotateOnAxis( airplane, axisZ, - 0.08 );

                        if(goUp)
                            app.rotateOnAxis( airplane, axisX, 0.08 );

                        if(goDown)
                            app.rotateOnAxis( airplane, axisX, - 0.08 );

                        renderer.render( scene, camera );
                    },
                    rotateOnAxis: function( object, axis, angle ){
                        _q1.setFromAxisAngle( axis, angle );
                        //object.quaternion.multiplySelf( _q1 );
                        object.quaternion.multiplyQuaternions( _q1, object.quaternion );
                    }
                }
            };

            //arrow keys pressed
            $(document).keydown(function(e){
                if (e.keyCode == 37) {  //left arrow
                    goLeft = true
                    goRight = false
                }
                if (e.keyCode == 39) { //right arrow
                    goRight = true
                    goLeft = false
                }
                if (e.keyCode == 38) {  //up arrow
                    goDown = true
                    goUp = false
                }
                if (e.keyCode == 40) { //down arrow
                    goUp = true
                    goDown = false
                }
            });

            $(document).keyup(function(){
                goLeft = false
                goRight = false
                goUp = false
                goDown = false
            });


            app = new App();
            app.init();
            app.animate();

            $scope.$on('$destroy', function() {
                App();
            });
            
        }else{
            console.error( 'canvas not supported' );
        }


    }]);

});

