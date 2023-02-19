import { useEffect } from "react"

const Drawing = (canvasRef, canvas2Ref)=>{

    const tool = "pencil";
    let isDrawing=false;
    useEffect(()=>{

        const canvas = canvasRef.current;
        const canvas2 = canvas2Ref.current;

        canvas.width = window.innerWidth-20;
        canvas.height = window.innerHeight-20;
        canvas2.width = window.innerWidth-20;
        canvas2.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        const ctx2 = canvas2.getContext('2d');
        
        ctx.lineWidth = 3;
        ctx2.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        canvas.addEventListener('mousedown', (e)=>startDrawing(e, ctx, ctx2));
        canvas.addEventListener('mousemove', (e)=>draw(e, ctx, ctx2, canvas, canvas2));
        canvas.addEventListener('mouseup'  , (e)=>stopDrawing(e, ctx, ctx2, canvas, canvas2));
        canvas.addEventListener('mouseout'  , (e)=>stopDrawing(e, ctx, ctx2, canvas, canvas2));

        return () => {
            canvas.removeEventListener('mousedown', (e) => startDrawing(e, ctx, ctx2));
            canvas.removeEventListener('mousemove', (e) => draw(e, ctx, ctx2, canvas, canvas2));
            canvas.removeEventListener('mouseup', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
            canvas.removeEventListener('mouseout', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
        };
    },[])


    const startDrawing = (e, ctx, ctx2) => {
        isDrawing=true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        console.log("first : ",e);
    }
    
    const draw = (e, ctx, ctx2, canvas, canvas2) => {
        if (!isDrawing) return;
        console.log("second")
        requestAnimationFrame(() => {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx2.lineTo(e.offsetX, e.offsetY);
            ctx2.stroke();
        });
        if (e.offsetY >= canvas.height - 100) {
            canvas.height =canvas.height+400;
            ctx.lineWidth = 3
        }
        const imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
        ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}

    const stopDrawing = (e, ctx, ctx2, canvas, canvas2) => {
        isDrawing=false;
        canvas2.height =canvas.height+20;
        ctx2.lineWidth = 3
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx2.putImageData(imageData, 0, 0, 0, 0, canvas2.width, canvas2.height);
    }
}

export default Drawing;