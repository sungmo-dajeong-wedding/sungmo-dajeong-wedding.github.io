import { useMemo } from 'react';

const Calendar = () => {
  const year = 2026;
  const month = 4; // 0부터 시작 (4 = 5월)
  const highlightDay = 3;

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 시작 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날짜

    const days: (number | null)[] = [];

    // 앞 공백
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 날짜 채우기
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  }, []);

  return (
    <section className="calendar section fade-up">
      <div className="calendar__inner">
        <header className="section-header">
          <p className="section-header__eyebrow">WEDDING DAY</p>
        </header>

        <p className="calendar__date">
          2026.05.03 · 일요일 오전 11:00
        </p>

        <p className="calendar__place">
          우리은행 본점 4F
        </p>

        <div className="calendar__wrapper">
          {/* 요일 */}
          <div className="calendar__header">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* 날짜 */}
          <div className="calendar__grid">
            {calendarDays.map((day, index) => (
              <div key={index} className="calendar__cell">
                {day && (
                  <span
                    className={`calendar__day ${
                      day === highlightDay ? 'highlight' : ''
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <a href="#location" className="calendar__cta">
          위치 안내 바로가기
        </a>
      </div>
    </section>
  );
};

export default Calendar;
