document.addEventListener('DOMContentLoaded', function() {
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

        for (const student of passedStudents) {
            if (student.name === name) {
                isFound = true;

                if (student.studentId === id) {
                    isPassed = true;
                    break;
                }
            }
        }

        if (isPassed) {
            resultDiv.innerHTML = `
                <div class="pass-message">
                    <h2>⭐ 축하합니다, ${name}님! ⭐</h2>
                    <p>하남고등학교 입학을 진심으로 축하합니다. 저희와 함께 꿈을 펼쳐나가길 기대합니다.</p>
                    <button id="printCertificate">입학증 출력</button>
                </div>
            `;
            schoolSong.play();
            
            document.getElementById('printCertificate').addEventListener('click', function() {
                const studentName = document.getElementById('studentName').value.trim();
                const currentDate = "2026년 3월 1일";

                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="ko">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>하남고등학교 입학증 - ${studentName}</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
                            
                            body {
                                font-family: 'Noto Sans KR', sans-serif;
                                background-color: #f0f2f5;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                                margin: 0;
                                padding: 20px;
                            }
                            .certificate-container {
                                width: 29.7cm;
                                height: 21cm;
                                box-sizing: border-box;
                                background-image: url('images/hanam_certificate_bg.jpg');
                                background-size: cover;
                                background-position: center;
                                position: relative;
                                padding: 80px 100px;
                                text-align: center;
                                border: 2px solid #000;
                            }
                            .title {
                                font-size: 3.5em;
                                font-weight: 700;
                                letter-spacing: 5px;
                                margin-bottom: 20px;
                                padding-top: 50px;
                                position: relative;
                            }
                            .title::after {
                                content: '';
                                display: block;
                                width: 150px;
                                height: 3px;
                                background-color: #1a237e;
                                margin: 10px auto 0;
                            }
                            .subtitle {
                                font-size: 1.5em;
                                margin-bottom: 80px;
                            }
                            .content-text {
                                font-size: 1.8em;
                                line-height: 1.8;
                                margin-bottom: 100px;
                            }
                            .student-name {
                                font-size: 2em;
                                font-weight: bold;
                                color: #1a237e;
                            }
                            .signature-section {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-end;
                                position: absolute;
                                bottom: 80px;
                                left: 100px;
                                right: 100px;
                            }
                            .date {
                                font-size: 1.5em;
                            }
                            .principal {
                                text-align: center;
                                font-size: 1.5em;
                            }
                            .principal-name {
                                font-weight: 700;
                                margin-top: 5px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="certificate-container">
                            <div class="subtitle">하남고등학교</div>
                            <div class="title">입 학 증</div>
                            <div class="content-text">
                                위 학생 <span class="student-name">${studentName}</span>은 2026 하남고등학교에 입학하였음을 이와 같이 증명합니다.
                            </div>
                            <div class="signature-section">
                                <div class="date">${currentDate}</div>
                                <div class="principal">
                                    <p>하남고등학교장</p>
                                    <p class="principal-name">조 태 봉</p>
                                </div>
                            </div>
                        </div>
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
            });
        } else if (isFound) {
            resultDiv.innerHTML = `
                <div class="error-message">
                    <h2>죄송합니다, 확인되지 않는 정보입니다.</h2>
                    <p>입력하신 수험번호를 다시 한 번 확인해 주세요.</p>
                </div>
            `;
            schoolSong.pause();
            schoolSong.currentTime = 0;
        } else {
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
});


