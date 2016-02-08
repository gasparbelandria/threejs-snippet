define('variables', ['app'], function (app) {

    'use strict';

    app.service('variables', function(){

        const _WIDTH = window.innerWidth;
        const _HEIGTH = window.innerHeight;

        var variables = {
            scene: {
                width: _WIDTH,
                height: _HEIGTH
            },
            camera: {
                view_angle: 45,
                aspect: _WIDTH / _HEIGTH,
                near: 0.1,
                far: 10000,
                position: {
                    x: 300,
                    y: 300,
                    z: 0
                }
            },
            primitives: {
                plane: {
                    width: 400,
                    height: 400,
                    widthSegments: 10,
                    heightSegments: 5,
                    texture: 'img/texture.jpg'
                },
                sphere: {
                    radius: 10,
                    segments: 100,
                    rings: 100,
                    texture: 'img/texture7.jpeg',
                    position: {
                        x: 40,
                        y: 20,
                        z: 40
                    }
                },
                cylinder: {
                    radiusTop: 5,
                    radiusBottom: 5,
                    height: 20,
                    radiusSegments: 32,
                    heightSegments: 5,
                    openEnded: false,
                    thetaStart: 1,
                    thetaLength: Math.PI * 3,
                    texture: 'img/texture6.png',
                    position: {
                        x: 40,
                        y: 20,
                        z: 0
                    }
                },
                cube: {
                    width: 10,
                    height: 10, depth:10,
                    widthSegments: 3,
                    heightSegments: 3,
                    depthSegments: 3,
                    texture: 'img/texture5.png',
                    position: {
                        x: 40,
                        y: 20,
                        z: -40
                    }
                },
                circle: {
                    radius: 10,
                    segments:30,
                    thetaStart: 2,
                    thetaLength: Math.PI * 2,
                    texture: 'img/texture16.jpg',
                    position: {
                        x: 0,
                        y: 10,
                        z: 40
                    }
                },
                torus: {
                    radius: 10,
                    tube: 3,
                    radialSegments: 16,
                    tubularSegments: 100,
                    arc: Math.PI * 30,
                    texture: 'img/texture15.jpg',
                    position: {
                        x: 0,
                        y: 10,
                        z: -40
                    }
                },
                torusknot: {
                    radius: 10,
                    tube: 2,
                    radialSegments: 160,
                    tubularSegments: 100,
                    p: 2,
                    q: 3,
                    heightScale: 1,
                    texture: 'img/texture14.jpg',
                    position: {
                        x: 0,
                        y: 40,
                        z: 0
                    }
                },
                figure: {
                    vertices: [[2,7,0],[7,2,0],[12,7,0],[12,17,0],[7,12,0],[2,17,0],[2,7,0],[2,7,2],[7,2,2],[12,7,2],[12,17,2],[7,12,2],[2,17,2],[2,7,2]],
                    texture: 'img/textureshape.jpg',
                    position: {
                        x: -40,
                        y: 20,
                        z: 0
                    }
                }
            }
        };
        return variables;
    });

});


