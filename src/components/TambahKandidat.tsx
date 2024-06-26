import { useState } from "preact/hooks";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { API_CANDIDATE_POST_CREATE } from "../env";
interface CandidateFormData {
  noUrut: string;
  name: string;
  age: string;
  file: File | null;
}
export default function TambahKandidat() {
  const token = Cookies.get("token");
  const [formData, setFormData] = useState<CandidateFormData>({
    noUrut: "",
    name: "",
    age: "",
    file: null,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handlePhotoProfileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setFormData({
        ...formData,
        file: target.files[0],
      });
    }
  };

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    if (!/^\d+$/.test(formData.noUrut)) {
      setError("Nomor Urut harus berupa angka.");
      return;
    }

    if (!/^\d+$/.test(formData.age)) {
      setError("Umur harus berupa angka.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("noUrut", formData.noUrut);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("age", formData.age);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await axios.post(
        API_CANDIDATE_POST_CREATE,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respon dari server:", response.data);
      alert("Data kandidat berhasil ditambahkan.");

      setFormData({
        noUrut: "",
        name: "",
        age: "",
        file: null,
      });
      setError("");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error("Error mengirim data:", error);
        alert(
          `Gagal menambahkan kandidat. Silakan coba lagi \n Error Message: ${error.response?.data.error}`
        );
      } else {
        alert("Gagal menambahkan kandidat. Silakan coba lagi");
      }
    }
  };
  return (
    <section className="pb-5 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-none mt-5"
        style={{ backgroundColor: "#ECF8F7", width: "90%" }}
      >
        <form className="px-5 py-4" onSubmit={handleFormSubmit}>
          <h3>Tambahkan Kandidat</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="noUrut" className="form-label">
              Nomor Urut
            </label>
            <input
              type="text"
              className="form-control"
              id="noUrut"
              value={formData.noUrut}
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
            <label htmlFor="age" className="form-label">
              Umur
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Photo Profile
            </label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept="image/*"
              onChange={handlePhotoProfileChange}
            />
          </div>
          <button type="submit" className="my-1 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
