const Invitation = () => {

  const params = new URLSearchParams(window.location.search);
  const extraInfo = params.get("extraInfo") === "Y";

  const family = [
  { father: "김홍기", mother: "이현진", label: "의 장남", name: "김성모" },
  { father: "", mother: "서희라", label: "의 장녀", name: "최다정" },
];

  return (
    <section className="invitation section fade-up">
      <div className="invitation__inner">
        <header className="section-header">
          <p className="section-header__eyebrow">INVITATION</p>
        </header>

        <div className="invitation__message">
          <p>
            우연히 만난 자리에서 <br />
            서로를 처음 알게 되었습니다.
          </p>

          <p>
            오래전부터 기다려온 사람처럼<br />
            함께할수록 서로를 닮아가며<br /> 더욱 사랑하게 되었습니다.
          </p>

          <p>
            이제는 평생을 함께하고자 합니다.<br />
            소중한 걸음으로 함께해 주시어<br />
            저희의 기쁨을 나눠주시면 감사하겠습니다.
          </p>
        </div>

        <p className="invitation__sign">- 성모 · 다정 올림 -</p>

        {extraInfo && (
          <div className="invitation__family">
            {family.map((f, i) => (
              <div className="family-row" key={i}>
                <span className="family-parent">{f.father}</span>
                <span className="family-dot">{f.father ? "·" : ""}</span>
                <span className="family-parent">{f.mother}</span>
                <span className="family-label">{f.label}</span>
                <strong className="family-name">{f.name}</strong>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Invitation;
