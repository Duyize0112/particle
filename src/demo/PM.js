import *as THREE from 'three';

const vertices = [];
const velocities = [];
const maxVelocity = 0.5;
for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push(x, y, z);

    const vx = (Math.random() - 0.5) * maxVelocity;
    const vy = (Math.random() - 0.5) * maxVelocity;
    const vz = (Math.random() - 0.5) * maxVelocity;
    velocities.push(vx, vy, vz);
}



const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

const positions = geometry.getAttribute('position');
for (let i = 0; i < positions.count; i++) {
    // 随机生成新顶点的位置
    const randomVector = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    // 添加新顶点的位置到 BufferGeometry 中
    positions.setXYZ(i, randomVector.x * 50, randomVector.y * 50, randomVector.z * 50);
}
function getTexture(){
    var texture=new THREE.TextureLoader().load('./src/assets/tl.webp');
    return texture;
}
const material=new THREE.PointsMaterial({
    //color:0x87CEFA,
    size:10,
    transparent:true,
    map:getTexture(),
    blending:THREE.NormalBlending,
    opacity:0.5,

})
const points=new THREE.Points(geometry,material)
function animate() {
    requestAnimationFrame(animate);

    const positions = geometry.attributes.position.array;
    const velocityArray = geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocityArray[i];
        positions[i + 1] += velocityArray[i + 1];
        positions[i + 2] += velocityArray[i + 2];

        // Bounce off the walls
        if (positions[i] > 300 || positions[i] < -300) velocityArray[i] = -velocityArray[i];
        if (positions[i + 1] > 300 || positions[i + 1] < -300) velocityArray[i + 1] = -velocityArray[i + 1];
        if (positions[i + 2] > 300 || positions[i + 2] < -300) velocityArray[i + 2] = -velocityArray[i + 2];
    }

    geometry.attributes.position.needsUpdate = true;
}

// Start the animation loop
animate();

export default points;