<template>
  <div class="body">
    <div class="face-container">
      <div class="face">
        <div class="eye left">
          <div class="lower">
            <div class="lid"></div>
          </div>
          <div class="upper">
            <div class="lid"></div>
          </div>
        </div>
        <div class="eye right">
          <div class="lower">
            <div class="lid"></div>
          </div>
          <div class="upper">
            <div class="lid"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="app_logo fish">.TOUCH THE FISH </div>
    <div class="link" @click="$router.openPage('login')"> {{code}}s后跳转</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        code:5
    };
  },
  mounted() {
    this.initEge();
    this.set()
  },
  methods: {
      set() {
      this.code = 5;
      const timer = setInterval(() => {
        // console.log(this.code)
        if (this.code == 0) {
          clearInterval(timer);
          this.$router.openPage('login')
          return;
        }
        this.code--;
      }, 1000);
    },
    initpage() {
      window.addEventListener("DOMContentLoaded", app);
      console.log(1);
      function app() {
        var scene,
          camera,
          renderer,
          roflcopter,
          colors = [0xf1f1f1, 0x171717],
          adjustWindow = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          },
          detectScheme = mq => {
            if (mq.matches) {
              // dark
              renderer.setClearColor(new THREE.Color(colors[1]));
              roflcopter.material.color.set(colors[0]);
            } else {
              // light
              renderer.setClearColor(new THREE.Color(colors[0]));
              roflcopter.material.color.set(colors[1]);
            }
          },
          init = () => {
            // setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
              60,
              window.innerWidth / window.innerHeight,
              0.1,
              1000
            );
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(colors[0]));
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;

            // roflcopter
            roflcopter = new Roflcopter(colors[1]);
            scene.add(roflcopter.mesh);

            // camera
            camera.position.set(-30, 0, 0);
            camera.lookAt(scene.position);
            let camControls = new THREE.OrbitControls(
              camera,
              renderer.domElement
            );

            // use proper scheme for light or dark mode
            if (window.matchMedia) {
              const mq = window.matchMedia("(prefers-color-scheme: dark)");
              mq.addListener(detectScheme);
              detectScheme(mq);
            }

            // render
            document.body.appendChild(renderer.domElement);
            renderScene();
          },
          renderScene = () => {
            update();
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
          },
          update = () => {
            // allow characters to look at user
            roflcopter.mesh.traverse(child => {
              if (child instanceof THREE.Mesh) child.lookAt(camera.position);
            });
            roflcopter.spin();
          };

        init();
        window.addEventListener("resize", adjustWindow);
      }

      class Roflcopter {
        constructor(color) {
          this.spinAngle = 0;
          this.spinSpeed = 6;

          this.material = new THREE.MeshBasicMaterial({
            color: color
          });
          this.mesh = new THREE.Object3D();
          this.mesh.name = "roflcopter";

          this.propeller = new THREE.Object3D();
          this.propeller.position.y = 5.25;
          this.mesh.add(this.propeller);

          this.rearBlades = new THREE.Object3D();
          this.rearBlades.position.set(0, 0.75, -9);
          this.mesh.add(this.rearBlades);

          let fontLoader = new THREE.FontLoader();
          fontLoader.load(
            "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
            font => {
              let params = {
                  font: font,
                  size: 1,
                  height: 0,
                  curveSegments: 8
                },
                mat = this.material,
                chars = [
                  new THREE.TextBufferGeometry("R", params),
                  new THREE.TextBufferGeometry("O", params),
                  new THREE.TextBufferGeometry("F", params),
                  new THREE.TextBufferGeometry("L", params),
                  new THREE.TextBufferGeometry("I", params),
                  new THREE.TextBufferGeometry(":", params),
                  new THREE.TextBufferGeometry("^", params),
                  new THREE.TextBufferGeometry("-", params),
                  new THREE.TextBufferGeometry("—", params),
                  new THREE.TextBufferGeometry("_", params),
                  new THREE.TextBufferGeometry("=", params),
                  new THREE.TextBufferGeometry("/", params),
                  new THREE.TextBufferGeometry("\\", params),
                  new THREE.TextBufferGeometry("[", params),
                  new THREE.TextBufferGeometry("]", params)
                ];

              // character centering
              for (let c of chars) {
                c.computeBoundingBox();
                c.translate(0, 0, -c.boundingBox.max.x / 2);
              }
              let [
                R,
                O,
                F,
                L,
                I,
                colon,
                caret,
                dash,
                emDash,
                underscore,
                equals,
                slash,
                backslash,
                leftBracket,
                rightBracket
              ] = chars;

              /* Propeller Parts */
              let propeller_children = [
                  R,
                  O,
                  F,
                  L,
                  colon,
                  R,
                  O,
                  F,
                  L,
                  colon,
                  L,
                  O,
                  L,
                  colon,
                  R,
                  O,
                  F,
                  L,
                  colon,
                  R,
                  O,
                  F,
                  L
                ],
                propeller_childZ = -11;

              for (let c of propeller_children) {
                let child = new THREE.Mesh(c, mat);
                child.position.z = propeller_childZ;
                this.propeller.add(child);
                ++propeller_childZ;
              }

              /* Top Axle */
              let child = new THREE.Mesh(caret, mat);
              child.position.y = 3.75;
              this.mesh.add(child);

              /* Top */
              for (let z = -5; z < 4; ++z) {
                let char = z == -5 ? slash : emDash,
                  child = new THREE.Mesh(char, mat);
                child.position.set(0, 2.25, z);
                this.mesh.add(child);
              }

              /* Upper Middle */
              // rear blade parts
              let rearBladeCenter = new THREE.Mesh(O, mat);
              this.rearBlades.add(rearBladeCenter);

              let topBlade = new THREE.Mesh(L, mat);
              topBlade.position.y = 1.5;
              this.rearBlades.add(topBlade);

              let rightBlade = new THREE.Mesh(L, mat);
              rightBlade.position.z = 1;
              this.rearBlades.add(rightBlade);

              let bottomBlade = new THREE.Mesh(L, mat);
              bottomBlade.position.y = -1.5;
              this.rearBlades.add(bottomBlade);

              let leftBlade = new THREE.Mesh(L, mat);
              leftBlade.position.z = -1;
              this.rearBlades.add(leftBlade);

              // tail
              for (let z = -7; z < -4; ++z) {
                let child = new THREE.Mesh(equals, mat);
                child.position.set(0, 0.75, z);
                this.mesh.add(child);
              }
              // window
              let windowPt1 = new THREE.Mesh(leftBracket, mat);
              windowPt1.position.set(0, 0.75, 2);
              this.mesh.add(windowPt1);
              let windowPt2 = new THREE.Mesh(rightBracket, mat);
              windowPt2.position.set(0, 0.75, 3);
              this.mesh.add(windowPt2);

              // front
              let upperFront = new THREE.Mesh(backslash, mat);
              upperFront.position.set(0, 0.75, 4);
              this.mesh.add(upperFront);

              /* Lower Middle */
              for (let z = -4; z < 6; z += 9) {
                let child = new THREE.Mesh(backslash, mat);
                child.position.set(0, -0.75, z);
                this.mesh.add(child);
              }

              /* Bottom */
              for (let z = -3; z < 7; ++z) {
                let char = underscore;
                if (z == -3) char = backslash;
                else if (z == 6) char = rightBracket;

                let child = new THREE.Mesh(char, mat);
                child.position.set(0, -2.25, z);
                this.mesh.add(child);

                if (z == 4) ++z;
              }
              /* Legs */
              for (let z = -1; z < 4; z += 4) {
                let child = new THREE.Mesh(I, mat);
                child.position.set(0, -3.75, z);
                this.mesh.add(child);
              }
              /* Skis */
              for (let z = -3; z < 9; ++z) {
                let char = z < 8 ? dash : slash,
                  child = new THREE.Mesh(char, mat);
                child.position.set(0, -5.25, z);
                this.mesh.add(child);
              }
            }
          );
        }
        spin() {
          this.spinAngle += this.spinSpeed;

          if (this.spinAngle >= 360) this.spinAngle = 0;

          let angleToRad = (this.spinAngle * Math.PI) / 180;
          this.rearBlades.rotation.x = angleToRad;
          this.propeller.rotation.y = angleToRad;
        }
      }
    },
    initEge() {
      let states = {
        neutral: {
          //Post your other emotions as a comment
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 0
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 0
            }
          }
        },
        happy: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 20,
              position: 40
            },
            upper: {
              rotation: 0,
              position: 0
            }
          },
          right: {
            lower: {
              rotation: -20,
              position: 40
            },
            upper: {
              rotation: 0,
              position: 0
            }
          }
        },
        sad: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: -20,
              position: 40
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 20,
              position: 40
            }
          }
        },
        close: {
          face: {
            rotationX: -20,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 45
            },
            upper: {
              rotation: 0,
              position: 45
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 45
            },
            upper: {
              rotation: 0,
              position: 45
            }
          }
        },
        angry: {
          face: {
            rotationX: -10,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 20,
              position: 40
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: -20,
              position: 40
            }
          }
        },
        confused: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 40
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 0
            }
          }
        },
        suspicious: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: -4,
              position: 20
            },
            upper: {
              rotation: 4,
              position: 20
            }
          },
          right: {
            lower: {
              rotation: 4,
              position: 20
            },
            upper: {
              rotation: -4,
              position: 20
            }
          }
        },
        pain: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 10,
              position: 20
            },
            upper: {
              rotation: -10,
              position: 20
            }
          },
          right: {
            lower: {
              rotation: -10,
              position: 20
            },
            upper: {
              rotation: 10,
              position: 20
            }
          }
        },
        unamused: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
          },
          left: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 40
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 40
            }
          }
        },
        unsure: {
          face: {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 7
          },
          left: {
            lower: {
              rotation: 10,
              position: 20
            },
            upper: {
              rotation: -10,
              position: 20
            }
          },
          right: {
            lower: {
              rotation: 0,
              position: 0
            },
            upper: {
              rotation: 0,
              position: 0
            }
          }
        }
      };
      
      const setState = state => {
        // console.log(state);
        if (states[state] == undefined) return;
        $(".face").attr(
          "style",
          `
        --left-lower-rotation:${states[state].left.lower.rotation}deg;
        --left-lower-position:${states[state].left.lower.position}%;
        --left-upper-rotation:${states[state].left.upper.rotation}deg;
        --left-upper-position:${states[state].left.upper.position}%;
        --right-lower-rotation:${states[state].right.lower.rotation}deg;
        --right-lower-position:${states[state].right.lower.position}%;
        --right-upper-rotation:${states[state].right.upper.rotation}deg;
        --right-upper-position:${states[state].right.upper.position}%;
        --face-rotation-x:${states[state].face.rotationX}deg;
        --face-rotation-y:${states[state].face.rotationY}deg;
        --face-rotation-z:${states[state].face.rotationZ}deg;
    `
        );
      };
      console.log("Test");
      let emotions = Object.keys(states);
      //let index = 3;
      let previous = [];
      setState("happy");

      const nextState = () => {
        let ind = Math.floor(Math.random() * emotions.length);
        if (previous.indexOf(ind) != -1) return nextState();
        previous.push(ind);
        previous = previous.slice(-4); //Save most recent 4 states to not use
        return ind;
      };

      const timer =  setInterval(() => {
        // console.log(this.$route.name)
        const _name = this.$route.name
        if(_name != 'Load'){
            clearInterval(timer)
        }
        setState(emotions[nextState()]);
        //setState(emotions[index%emotions.length]);
        //index++;
      }, 1500);
    }
  }
};
</script>
<style lang="scss">
@keyframes logo{

}
.body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
  position: relative;
  .fish{
      position: absolute;
      top: 180px;
      margin:  0 auto;
      width: 230px;
      left: calc(50% - 115px);
  }
  .link{
      position: absolute;
      width: 70px;
      height: 30px;
      border-radius:  15px;
      top: 9px;
      right: 12px;
      color: #333;
      text-align: center;
      line-height: 30px;
      background: 	rgba(255, 255, 255,0.8);
  }
}
:root {
    --eye-size:8rem;
    --eye-gap:7rem;
    --eye-color:white;
    --background:#EC87C0;
    --user-button-main:#D770AD;
}
body {
    min-height: 100vh;
    perspective: 25rem;
    overflow: hidden;
    .face-container {
        width:100vw;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: var(--background);
        @keyframes float {
            0%, 100% {
                transform:translateY(-5%);
            }
            50% {
                transform:translateY(5%);
            }
        }
    }
    .face {
        --left-lower-rotation:0deg;
        --left-lower-position:0%;
        --left-upper-rotation:0deg;
        --left-upper-position:0%;
        --right-lower-rotation:0deg;
        --right-lower-position:0%;
        --right-upper-rotation:0deg;
        --right-upper-position:0%;
        --face-rotation-x:0deg;
        --face-rotation-y:0deg;
        --face-rotation-z:0deg;
        display:grid;
        grid-template-columns: var(--eye-size) var(--eye-gap) var(--eye-size);
        grid-template-rows: var(--eye-size);
        grid-template-areas: "left . right";
        filter: blur(0.25rem) contrast(8); //Make corners rounded, this requires a black shadow to add definition to the eye edges and then hide the black using the lighten mix-blend-mode (as pink is lighter than black the black will vanish)
        transform: translateZ(4rem) rotateX(var(--face-rotation-x)) rotateY(var(--face-rotation-y)) rotateZ(var(--face-rotation-z));// rotateX(var(--face-rotation));
        transition: .75s cubic-bezier(.25, .5, .5, 1);
        mix-blend-mode: lighten; //Replace black with pink
        .eye {
            position: relative;
            background: white;
            border-radius:100%;
            overflow: hidden;
            box-shadow: 0 0 0 1rem black;
            &, * {
                transition: .5s cubic-bezier(0.75, 0.25, 0.25, 0.75);
            }
            >div {
                --rotation:0deg;
                --position:0%;
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                transform: rotate(var(--rotation));
                .lid {
                    position: absolute;
                    width:100%;
                    height:100%;
                    background:  black;
                }
                &.lower .lid {
                    top:calc(100% - var(--position));
                }
                &.upper .lid {
                    bottom:calc(100% - var(--position));
                }
            }
            &.left {
                grid-area: left;
                .lower {
                    --rotation:var(--left-lower-rotation);
                    --position:var(--left-lower-position);
                }
                .upper {
                    --rotation:var(--left-upper-rotation);
                    --position:var(--left-upper-position);
                }
            }
            &.right {
                grid-area: right;
                .lower {
                    --rotation:var(--right-lower-rotation);
                    --position:var(--right-lower-position);
                }
                .upper {
                    --rotation:var(--right-upper-rotation);
                    --position:var(--right-upper-position);
                }
            }
        }
    }
}
</style>