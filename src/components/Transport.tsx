const Transport = () => {
  return (
    <div className="transport">
      <h3>지하철 이용 시</h3>
      <p>
        <mark>4호선 회현역 1번 출구</mark>, 명동역 방향 도보 4분
        <br />
        <mark>4호선 명동역 4번 출구</mark>, 회현역 방향 도보 7분
        <br />
        <mark>회현지하쇼핑센터 8번 출구</mark>, 건물 지하 연결
      </p>

      <h3>버스 이용 시</h3>
      <p>
        <mark>남산3호터널.정화예술대학교</mark> 하차, 도보 4분
        <br />
        <mark>남산3호터널</mark> 하차, 도보 3분
        <br />
        <mark>신세계백화점</mark> 하차, 도보 4분
      </p>

      <h3>자가용 이용 시</h3>
      <p>
        내비게이션 <mark>'우리은행 본점'</mark> 검색
        <br />
        건물 내 주차 가능 <mark>(당일 종일 무료)</mark>
      </p>
    </div>
  );
};

export default Transport;