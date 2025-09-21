// script.js 파일

// 합격자 데이터를 배열(Array) 형태로 변경
const passedStudents = [
    { name: "홍길동", studentId: "2025001" },
    { name: "김철수", studentId: "2025002" },
    { name: "이영희", studentId: "2025003" },
    { name: "홍길동", studentId: "2025101" } // 동명이인 추가
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

    // 배열의 각 학생 정보를 순서대로 확인
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
        // 합격
        // 학생 정보에 맞는 이미지 파일 경로를 생성
        const certificateImagePath = `images/${foundStudent.name}_${foundStudent.studentId}.jpg`;
        
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
        
        // 새로 생성된 버튼에 이벤트 리스너를 다시 연결
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

    } else if (isFound) {
        // 이름은 맞지만 수험번호가 틀린 경우 (동명이인 포함)
        resultDiv.innerHTML = `
            <div class="error-message">
                <h2>죄송합니다, 확인되지 않는 정보입니다.</h2>
                <p>입력하신 수험번호를 다시 한 번 확인해 주세요.</p>
            </div>
        `;
        schoolSong.pause();
        schoolSong.currentTime = 0;
    } else {
        // 입력한 이름이 명단에 없는 경우
        resultDiv.innerHTML = `
            <div class="fail-message">
                <h2>아쉽지만, 다음 기회에...</h2>
                <p>이번에 함께하지 못하게 되어 아쉽습니다. ${name}님께서 앞으로 어떤 길을 가시든 늘 응원하겠습니다.</p>
            </div>
        `;
        schoolSong.pause();
        schoolSong.currentTime = 0;
    }
});
