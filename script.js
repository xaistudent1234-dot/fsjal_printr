// Simple oldschool functionality

// Copy CA function
function copyCA() {
    const caAddress = document.getElementById('caAddress').textContent;
    navigator.clipboard.writeText(caAddress).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = '[Copied!]';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = caAddress;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const btn = document.querySelector('.copy-btn');
            btn.textContent = '[Copied!]';
            setTimeout(() => {
                btn.textContent = '[Copy]';
            }, 2000);
        } catch (err) {
            alert('Failed to copy. Please copy manually: ' + caAddress);
        }
        document.body.removeChild(textArea);
    });
}

// Make copyCA globally available
window.copyCA = copyCA;

// Simple image click effect
const fsjalImage = document.getElementById('fsjalImage');
if (fsjalImage) {
    fsjalImage.addEventListener('click', () => {
        console.log('fsjal clicked!');
    });
}

// Lightbox for gallery
function openLightbox(src, filename) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxTitle').textContent = filename;
    lb.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Money Printer Easter Egg
const printer = document.getElementById('printer');
const moneyBills = document.getElementById('moneyBills');
let isPrinting = false;

if (printer && moneyBills) {
    printer.addEventListener('click', () => {
        if (isPrinting) return;
        
        isPrinting = true;
        printer.classList.add('printing');
        
        // Print 5 bills
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const bill = document.createElement('div');
                bill.className = 'money-bill';
                bill.style.animationDelay = '0s';
                moneyBills.appendChild(bill);
                
                // Remove bill after animation
                setTimeout(() => {
                    bill.remove();
                }, 2000);
            }, i * 400);
        }
        
        // Reset printing state
        setTimeout(() => {
            printer.classList.remove('printing');
            isPrinting = false;
        }, 2500);
    });
}

console.log('Welcome to /v/ - fsjal thread');
console.log('psst... check the bottom right corner 👀');

// MS Paint Drawing Application
const drawCanvas = document.getElementById('drawCanvas');
if (drawCanvas) {
    const drawCtx = drawCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');

    // Set initial canvas background
    drawCtx.fillStyle = '#fff';
    drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

    // Mouse events
    drawCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = drawCanvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
    });

    drawCanvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = drawCanvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        drawCtx.strokeStyle = colorPicker.value;
        drawCtx.lineWidth = brushSize.value;
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(currentX, currentY);
        drawCtx.stroke();
        
        lastX = currentX;
        lastY = currentY;
    });

    drawCanvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    drawCanvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // Touch support for mobile
    drawCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = drawCanvas.getBoundingClientRect();
        isDrawing = true;
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    });

    drawCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const touch = e.touches[0];
        const rect = drawCanvas.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        
        drawCtx.strokeStyle = colorPicker.value;
        drawCtx.lineWidth = brushSize.value;
        drawCtx.lineCap = 'round';
        drawCtx.lineJoin = 'round';
        
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(currentX, currentY);
        drawCtx.stroke();
        
        lastX = currentX;
        lastY = currentY;
    });

    drawCanvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            drawCtx.fillStyle = '#fff';
            drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
        });
    }

    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'my-fsjal.png';
            link.href = drawCanvas.toDataURL();
            link.click();
        });
    }
}
