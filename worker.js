self.onmessage = function(e) {
    const { imgData, region, thumbSize } = e.data;
    const canvas = new OffscreenCanvas(thumbSize[0], thumbSize[1]);
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(
            img,
            region[0]+2, region[1],
            region[2]-region[0]-3, region[3]-region[1],
            0, 0,
            thumbSize[0], thumbSize[1]
        );
        canvas.convertToBlob({ quality: 0.7, type: 'image/jpeg' })
            .then(blob => {
                const reader = new FileReader();
                reader.onload = () => postMessage(reader.result);
                reader.readAsDataURL(blob);
            });
    };
    img.src = imgData;
};