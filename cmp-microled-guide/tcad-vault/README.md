# CMP TCAD Research Vault

이 폴더는 **결과 제출(submissions)** 과 별개인 장기 보존용 저장소이다.

- `submissions/P#`: Gate 검토를 위한 공식 결과 제출
- `tcad-vault/P#`: 재현·백업을 위한 자유 저장 공간
- `tcad-vault/_inbox`: 분류 전 빠른 백업
- `tcad-vault/_shared`: 여러 Phase에서 공통으로 쓰는 사용자 작성 자료
- `tcad-vault/_current-account`: 현재 TCAD 계정이 종료되기 전에 남겨둘 환경/재실행 메모

## 계정 교체 전 우선 백업

1. 사용자가 직접 작성하거나 수정한 `.cmd`, `.par`, Tcl/Shell/Python script
2. CMP 프로젝트 작업 디렉터리에서 재실행에 필요한 입력 파일
3. 로그, CSV, 그래프, 캡처, 결과 요약
4. Sentaurus release / 실행 명령 / 환경변수 / 필요한 경로를 적은 메모
5. 어떤 예제를 참고했는지 **예제명과 설치 경로**를 기록

## 공개 저장소 주의

현재 이 GitHub 저장소는 공개 상태이다. 다음 항목은 올리지 않는다.

- 비밀번호, 토큰, SSH key, 라이선스 파일
- 사내/학교 내부 서버의 민감한 접속정보
- 배포 권한이 확인되지 않은 Synopsys 매뉴얼이나 설치 라이브러리 원본
- 제3자 비공개 데이터

Synopsys 설치 예제는 라이선스/배포 조건을 확인하기 전에는 원본 전체를 공개 GitHub에 복제하지 말고, **예제명·경로·사용한 설정을 기록하고 본인이 작성/수정한 파일 위주로 백업**한다.
