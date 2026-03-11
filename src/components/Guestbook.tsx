import { useState, useEffect, useRef } from "react";
import { addGuestbook, subscribeGuestbook, deleteGuestbook } from "../lib/guestbook";
import ReCAPTCHA from "react-google-recaptcha";
import { Trash2 } from "lucide-react";

type GuestbookItem = {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt?: any;
};

export default function Guestbook() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState<GuestbookItem[]>([]);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const captchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {

    const unsubscribe = subscribeGuestbook((data) => {
      setList(data);
    });

    return () => unsubscribe();

  }, []);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (!name || !message || !password) return;

    if (message.length > 200) {
      alert("메시지는 200자 이하로 작성해주세요.");
      return;
    }

    const token = captchaRef.current?.getValue();

    if (!token) {
      alert("스팸 확인을 완료해주세요.");
      return;
    }

    const lastWrite = localStorage.getItem("guestbook_last");

    if (lastWrite && Date.now() - Number(lastWrite) < 30000) {
      alert("30초 후 다시 작성해주세요.");
      return;
    }

    await addGuestbook(name, message, password);

    localStorage.setItem("guestbook_last", String(Date.now()));

    setName("");
    setMessage("");
    setPassword("");

    captchaRef.current?.reset();
  }

  async function handleDelete(item: GuestbookItem) {

        const input = prompt("비밀번호를 입력하세요");

        if (!input) return;

        if (input !== item.password) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        const previous = list;

        setList((prev) => prev.filter((v) => v.id !== item.id));

        try {
            await deleteGuestbook(item.id);
        } catch (err) {
            setList(previous);
            alert("삭제되지 않았습니다.");
        }
    }

  function formatDate(timestamp: any) {

    if (!timestamp) return "";

    const date = timestamp.toDate();

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}.${m}.${d}`;
  }

  return (
    <div className="guestbook">

      <header className="section-header">
        <p className="section-header__eyebrow">GUESTBOOK</p>
        <h2 className="section-header__title">방명록</h2>
      </header>

      <form className="guestbook__form" onSubmit={handleSubmit}>

        <input
          className="guestbook__input"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="guestbook__textarea"
          placeholder="축하 메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          className="guestbook__input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="guestbook__captcha">
          <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
        </div>

        <button className="guestbook__submit" type="submit">
          작성하기
        </button>

      </form>

      <div className="guestbook__list">

        {list.map((item) => (

          <div key={item.id} className="guestbook__item">

            <div className="guestbook__item-header">

              <span className="guestbook__name">{item.name}</span>

              <div className="guestbook__meta">

                <span className="guestbook__date">
                  {formatDate(item.createdAt)}
                </span>

                <button
                  className="guestbook__delete"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 size={14} />
                </button>

              </div>

            </div>

            <p className="guestbook__message">
              {item.message}
            </p>
        
          </div>

        ))}

      </div>

    </div>
);
}