import { useState } from "preact/hooks";
import Navbar from "../../components/Navbar";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { API_VOTER_POST_CREATE } from "../../env";

interface VoterFormData {
  nfcSN: string;
  nik: string;
  name: string;
}

export default function InputVoter() {
  const token = Cookies.get("token");
  const [formData, setFormData] = useState<VoterFormData>({
    nfcSN: "",
    nik: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    if (!/^\d+$/.test(formData.nik)) {
      setError("NIK harus berupa angka.");
      return;
    }

    try {
      const response = await axios.post(
        API_VOTER_POST_CREATE,
        {
          nfcSN: formData.nfcSN,
          name: formData.name,
          nik: formData.nik,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respon dari server:", response.data);
      alert("Data Pemilih berhasil ditambahkan.");

      setFormData({
        nfcSN: "",
        name: "",
        nik: "",
      });
      setError(null);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error("Error mengirim data:", error);
        alert(
          `Gagal menambahkan Pemilih. Silakan coba lagi \n Error Message: ${error.response?.data.error}`
        );
      } else {
        alert("Gagal menambahkan Pemilih. Silakan coba lagi");
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-none mt-5"
          style={{ backgroundColor: "#ECF8F7", width: "90%" }}
        >
          <form className="px-5 py-4" onSubmit={handleFormSubmit}>
            <h3>Tambahkan Daftar Pemilih</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="nik" className="form-label">
                NIK
              </label>
              <input
                type="text"
                className="form-control"
                id="nik"
                value={formData.nik}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nfcSN" className="form-label">
                NFC Serial Number
              </label>
              <input
                type="text"
                className="form-control"
                id="nfcSN"
                value={formData.nfcSN}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="my-1 btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
