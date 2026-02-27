const Invitation = () => {
  return (
    <section className="invitation section">
      <div className="invitation__inner">
        <p className="invitation__eyebrow">INVITATION</p>

        <div className="invitation__message">
          <p>
            함께 근무하던 회사에서 <br />
            서로를 처음 알게 되었습니다.
          </p>

          <p>
            오래전부터 기다려온 사람처럼<br />
            함꼐할수록 서로를 닮아가며<br /> 더욱 사랑하게 되었습니다.
          </p>

          <p>
            이제는 평생을 함께하고자 합니다.<br />
            소중한 걸음으로 함께해 주시어<br />
            저희의 기쁨을 나눠주시면 감사하겠습니다.
          </p>
        </div>

        <p className="invitation__sign">- 성모 · 다정 올림 -</p>

        <div className="invitation__family">
          {/* <p>
            김홍기 · 이현진 의 장남 <strong>김성모</strong><br />
            서희라 의 장녀 <strong>최다정</strong>
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default Invitation;
