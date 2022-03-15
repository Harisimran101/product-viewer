import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from  'three/examples/jsm/loaders/RGBELoader.js';
import { InteractionManager } from 'three.interactive';
import { ACESFilmicToneMappingShader } from "three/examples/jsm/Shaders/ACESFilmicToneMappingShader.js";

function init(){

const webgl = document.querySelector('#webgl');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;
let model,mixer;
let shoes;

console.log(width,height)

            const scene = new THREE.Scene();
            scene.background = new THREE.Color( '#E7E7E7' );
			scene.fog = new THREE.Fog( '#E5E5E5', 10, 80 );

			const camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true,canvas: webgl});
			renderer.setSize( width, height);
            renderer.setPixelRatio(window.devicePixelRatio / 1.2);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
            if(modeldata.enableShadow){
            renderer.shadowMap.enabled = true;
            }
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            const plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshStandardMaterial( { color: 0x999999, depthWrite: false } ) );
			plane.rotation.x = - Math.PI / 2;
 plane.receiveShadow = true;
			scene.add( plane );
           
            const geometry = new THREE.BoxGeometry( 1.7, 2.4, 1.0, 1, 1, 1);
            const material = new THREE.MeshStandardMaterial( {color: "#2E46FE"} );
            
    
                const interactionManager = new InteractionManager(
                    renderer,
                    camera,
                    renderer.domElement
                  );


               let clock = new THREE.Clock();
                 
                  
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.autoRotate = data.autorotate;
            controls.autoRotateSpeed = data.rotatespeed;
            controls.dampingFactor = 0.06;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI / 2.2;

            switch(data.graphics){

                case 'low':
                    renderer.setPixelRatio(devicePixelRatio / 1.4);
                    
                   break;

                 case 'medium':
                  renderer.setPixelRatio(devicePixelRatio / 1.2);
                  
                 break;
                 case 'high':
                    renderer.setPixelRatio(devicePixelRatio);
                    
                   break;
            }

            function check(){
                if(data.autorotate){

                if(data.stop = true){
                    console.log('s');
                     controls.autoRotate = false;
                     setTimeout(start, 4000);
                    function start(){
                     controls.autoRotate = true;
                    }
                      
                }
            }
        }

            window.addEventListener('click', () =>{
             
             check();
            })

            window.addEventListener('mousedown', () =>{
             
                check();
               })
   
            

    
     
const pmremGenerator = new THREE.PMREMGenerator( renderer );
new RGBELoader().load( 'Environment.hdr', function ( texture ) {

	texture.mapping = THREE.EquirectangularReflectionMapping;

	scene.environment = texture;


});

const directionalLight = new THREE.DirectionalLight( 'white', 0.8 );
scene.add( directionalLight );
directionalLight.position.set( 0, 4, 8);
directionalLight.castShadow = true;
//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512 * 2; // default
directionalLight.shadow.mapSize.height = 512 * 2; // default
directionalLight.shadow.camera.near = 0.2; // default
directionalLight.shadow.camera.far = 5000; // default
directionalLight.shadow.bias = -0.0001;

camera.position.set(0,1,6);



            const loader = new GLTFLoader();
            loader.load('scene.gltf', function(gltf){
               model = gltf.scene;
               model.scale.set(modeldata.scale,modeldata.scale,modeldata.scale)
               model.position.set(0,0,0);
           

               scene.add(model);
               interactionManager.add(model);

                mixer = new THREE.AnimationMixer( gltf.scene );
                if(modeldata.Animation){
                    mixer.clipAction( gltf.animations[ 0 ] ).play();
                }

                model.traverse(function(child){
                    child.castShadow = true;
                    child.receiveShadow = true;
                })
            
                  console.log(gltf.animations[0]);
                  let animated = gltf.animations[0];

            

               model.addEventListener("click",() =>{
                    window.open(modeldata.product_link);
                    
               })
               
               model.addEventListener('mousemove', () =>{
                document.body.style.cursor = 'pointer';
                
               })

               model.addEventListener('mouseout', e => {
                document.body.style.cursor = 'default';
              });

               if(data.animate){
                anime({
                    targets: model.position,
                    y: [model.position.y, model.position.y + 3],
                    loop: true,
                    direction: 'alternate',
                    easing: 'easeInOutCubic',
                    duration: data.duration * 1000,
    
               });
               }
       


    
            },
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            );

            let value = {
                num: 0
            }
     

            anime({
                 targets: value,
                 num: [0, 0.03],
                 loop: false,
            
                 duration: modeldata.duration * 1000,
                 delay: modeldata.delay * 1000,
                 easing: 'easeInCirc'
            })

			function animate() {
				requestAnimationFrame( animate );
              
                if ( mixer ) {
                    mixer.update(value.num);
                }
                console.log( clock.getDelta())
       controls.update();      
  
          renderer.render(scene,camera)
			};

			animate();

        }

        init();

