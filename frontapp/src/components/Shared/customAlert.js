import { useEffect, useState } from "react";

export default function CustomAlert({ message, setMessage, deleteConfirm }) {
  const [typeAlert, setTypeAlert] = useState({});
  const [textBtn, setTextBtn] = useState({ btn1: "", btn2: "" });

  const handleClick = () => {
    setMessage(null);
  };
  useEffect(() => {
    if (message.type === "success") {
      setTypeAlert("alert-success success");
      setTextBtn({ btn1: "OK", btn2: "" });
    }
    if (message.type === "error") {
      setTypeAlert("alert-danger error");
      setTextBtn({ btn1: "OK", btn2: "" });
    }
    if (message.type === "info") {
      setTypeAlert("bg-light info");
      setTextBtn({ btn1: "Cancelar", btn2: "Continuar" });
    }
  }, [message]);
  return (
    <div className="alert-container">
      <div className="alert-dismissible fade show">
        <div className={`alert customAlert ${typeAlert}`} role="alert">
          <i></i>
          <span>{message.text}</span>
          <div className="d-flex justify-content-center w-100 gap-3">
            <div className="position-relative">
              <button
                type="button"
                className="btn-close btn-ct-alert btn bg-secondary text-light position-relative"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={handleClick}
              >
                {textBtn.btn1}
              </button>
            </div>

            {textBtn.btn2 !== "" && (
              <div className="position-relative">
                <button
                  type="button"
                  className="btn-close btn-ct-alert bg-danger position-relative"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    deleteConfirm(true);
                    handleClick();
                  }}
                >
                  {textBtn.btn2}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
