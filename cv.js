// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
let canvas = document.getElementById('pdfCanvas');
let ctx = canvas.getContext('2d');

// PDF 파일 경로 (GitHub에 업로드된 파일명)
const PDF_URL = 'CV(Until 2025 October).pdf';

// 페이지 로드 시 PDF 자동 로드
document.addEventListener('DOMContentLoaded', function() {
    loadPDFFromURL();
});

// PDF 로드 함수
function loadPDFFromURL() {
    showLoading();
    
    pdfjsLib.getDocument(PDF_URL).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        hideLoading();
        showViewer();
        
        // 페이지 정보 업데이트
        document.getElementById('pageInfo').textContent = `Page 1 of ${pdfDoc.numPages}`;
        
        // 첫 페이지 렌더링
        renderPage(1);
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        hideLoading();
        showError();
    });
}

// UI 상태 관리 함수들
function showLoading() {
    document.getElementById('pdfViewer').style.display = 'none';
    document.getElementById('pdfError').style.display = 'none';
    document.getElementById('pdfLoading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('pdfLoading').style.display = 'none';
}

function showViewer() {
    document.getElementById('pdfViewer').style.display = 'block';
    document.getElementById('pdfError').style.display = 'none';
}

function showError() {
    document.getElementById('pdfViewer').style.display = 'none';
    document.getElementById('pdfError').style.display = 'block';
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
        // PDF 파일 다운로드
        const a = document.createElement('a');
        a.href = PDF_URL;
        a.download = 'CV(Until 2025 October).pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});

// 줌 인 버튼
document.getElementById('zoomIn').addEventListener('click', function() {
    if (scale < 3.0) {
        scale += 0.25;
        renderPage(pageNum);
    }
});

// 줌 아웃 버튼
document.getElementById('zoomOut').addEventListener('click', function() {
    if (scale > 0.5) {
        scale -= 0.25;
        renderPage(pageNum);
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
