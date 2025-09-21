// script.js 파일

const passedStudents = [
    { name: "홍길동", studentId: "2025001" },
    { name: "김철수", studentId: "2025002" },
    { name: "이영희", studentId: "2025003" },
    { name: "홍길동", studentId: "2025101" }
];

const nameMap = {
    "홍길동": "hong_gildong",
    "김철수": "kim_chulsoo",
    "이영희": "lee_younghee" 
};

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
        const englishName = nameMap[foundStudent.name] || foundStudent.name;
        const certificateImagePath = `images/${englishName}_${foundStudent.studentId}.jpg`;
        
        resultDiv.innerHTML = `
            <div class="pass-message">
                <h2>⭐ 축하합니다, ${name}님! ⭐</h2>
                <p>하남고등학교 입학을 진심으로 축하합니다. 아래 이미지를 확인하고 인쇄하세요.</p>
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
                            @page {
                                size: A4 landscape;
                            }
                            @media print {
                                body { margin: 0; }
                                img { 
                                    width: 100%; 
                                    height: auto;
                                    max-width: 100%; /* 이 부분이 추가되었습니다 */
                                    max-height: 100%; /* 이 부분이 추가되었습니다 */
                                }
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
