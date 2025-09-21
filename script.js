// script.js 파일

const passedStudents = [
    { name: "홍길동", studentId: "2025001" },
    { name: "김철수", studentId: "2025002" },
    { name: "이영희", studentId: "2025003" },
    { name: "홍길동", studentId: "2025101" }
];

const studentForm = document.getElementById('checkForm');
const resultDiv = document.getElementById('result');
const schoolSong = document.getElementById('schoolSong');

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentId').value.trim();
    
    if (!name || !id) {
        resultDiv.innerHTML = `<p class="error-message">이름과 수험번호를 모두 입력해 주세요.</p>`;
        schoolSong.pause();
        schoolSong.currentTime = 0;
        return;
    }

    let isFound = false;
    let isPassed = false;
    let foundStudent = null;
    for (const student of passedStudents) {
        if (student.name === name) {
            isFound = true;
            if (student.studentId === id) {
                isPassed = true;
                foundStudent = student;
                break;
            }
        }
    }

    if (isPassed) {
        let certificateImagePath = '';
        if (foundStudent.name === '홍길동' && foundStudent.studentId === '2025001') {
            certificateImagePath = `images/hong_gildong_2025001.jpg`;
        } else if (foundStudent.name === '김철수' && foundStudent.studentId === '2025002') {
            certificateImagePath = `images/kim_chulsoo_2025002.jpg`;
        } else {
            certificateImagePath = `images/${foundStudent.name}_${foundStudent.studentId}.jpg`;
        }
        
        resultDiv.innerHTML = `
            <div class="pass-message">
                <h2>⭐ 축하합니다, ${name}님! ⭐</h2>
                <p>하남고등학교 입학을 진심으로 축하합니다. 저희와 함께 꿈을 펼쳐나가길 기대합니다.</p>
                <div class="certificate-display">
                    <img src="${certificateImagePath}" alt="입학증 이미지" style="width: 100%; max-width: 800px; height: auto; border: 1px solid #ddd; margin-top: 20px;">
                </div>
                <button id="printCertificate">입학증 출력</button>
            </div>
        `;
        schoolSong.play();
        
        document.getElementById('printCertificate').addEventListener('click', function() {
            const imageToPrint = resultDiv.querySelector('.certificate-display img');
            if (imageToPrint) {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>입학증 출력</title>
                        <style>
                            @media print {
                                body { margin: 0; }
                                img { width: 100%; height: auto; }
                            }
                        </style>
                    </head>
                    <body>
                        <img src="${imageToPrint.src}" />
                        <script>
                            window.onload = function() {
                                window.print();
                                setTimeout(() => window.close(), 100);
                            };
                        </script>
                    </body>
                    </html>
                `);
                printWindow.document.close();
            } else {
                alert('출력할 입학증 이미지를 찾을 수 없습니다.');
            }
        });
    } else {
        resultDiv.innerHTML = `
            <div class="error-message">
                <h2>죄송합니다, 확인되지 않는 정보입니다.</h2>
                <p>입력하신 이름과 수험번호를 다시 한 번 확인해 주세요.</p>
            </div>
        `;
        schoolSong.pause();
        schoolSong.currentTime = 0;
    }
});
