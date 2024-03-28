import png from '../header.png'

const canvas = document.createElement('canvas');
canvas.width = 2336;
canvas.height = 160;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const image = new Image()
document.body.appendChild(canvas);

async function init(){
    const pngBlob = await fetch(png).then(res => res.blob())
    const base64 = await new Promise<string>(resolve => {
        const fr = new FileReader();
        fr.readAsDataURL(pngBlob);
        fr.onload = function (e: any) {
            resolve(e.target.result);
        }
    });
    image.src = base64
}

init().then(() => {
    if(!ctx)return;
    ctx?.drawImage(image,0,0);
    ctx.fillStyle='#ffffff';
    ctx.font = 'normal normal bold 46px Arial';
    ctx?.fillText('IFinD 自选债监控报告（2023-01-15~2023-01-14）',600,90);
});


export function getImageBase64() {
    return canvas.toDataURL('image/png');
}