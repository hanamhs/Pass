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
        const certificateFilePath = `images/${englishName}_${foundStudent.studentId}.pdf`;
        
        resultDiv.innerHTML = `
            <div class="pass-message">
                <h2>⭐ 축하합니다, ${name}님! ⭐</h2>
                <p>하남고등학교 입학을 진심으로 축하합니다. 아래 버튼을 눌러 입학증을 확인하고 인쇄하세요.</p>
                <div class="certificate-display">
                    <p style="text-align:center; color:#555; margin-top: 20px;">입학증을 보려면 아래 버튼을 클릭하세요.</p>
                </div>
                <button id="viewAndPrintCertificate">입학증 확인 및 인쇄</button>
            </div>
        `;
        schoolSong.play();
        
        document.getElementById('viewAndPrintCertificate').addEventListener('click', function() {
            window.open(certificateFilePath, '_blank');
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
