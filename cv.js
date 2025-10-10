// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
let canvas = document.getElementById('pdfCanvas');
let ctx = canvas.getContext('2d');

// PDF 업로드 처리
document.getElementById('pdfInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const typedarray = new Uint8Array(e.target.result);
            loadPDF(typedarray);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please select a valid PDF file.');
    }
});

// PDF 로드 함수
function loadPDF(data) {
    pdfjsLib.getDocument(data).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('pdfUploadArea').style.display = 'none';
        document.getElementById('pdfViewer').style.display = 'block';
        
        // 페이지 정보 업데이트
        document.getElementById('pageInfo').textContent = `Page 1 of ${pdfDoc.numPages}`;
        
        // 첫 페이지 렌더링
        renderPage(1);
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF file.');
    });
}

// 페이지 렌더링 함수
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    document.getElementById('pageInfo').textContent = `Page ${num} of ${pdfDoc.numPages}`;
}

// 다음 페이지
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// 이전 페이지 버튼
document.getElementById('prevPage').addEventListener('click', function() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

// 다음 페이지 버튼
document.getElementById('nextPage').addEventListener('click', function() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});

// 다운로드 버튼
document.getElementById('downloadBtn').addEventListener('click', function() {
    if (pdfDoc) {
        // 현재 업로드된 파일을 다운로드
        const fileInput = document.getElementById('pdfInput');
        if (fileInput.files[0]) {
            const url = URL.createObjectURL(fileInput.files[0]);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileInput.files[0].name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
});

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    if (!pdfDoc) return;
    
    if (e.key === 'ArrowLeft' && pageNum > 1) {
        pageNum--;
        queueRenderPage(pageNum);
    } else if (e.key === 'ArrowRight' && pageNum < pdfDoc.numPages) {
        pageNum++;
        queueRenderPage(pageNum);
    }
});
