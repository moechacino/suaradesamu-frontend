import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "preact/hooks";
import axios, { AxiosError } from "axios";
import { API_CANDIDATE_GETALL, API_CREDIBILITY } from "../env";
import { Candidate } from "../types/candidate";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

export default function TambahCredibility() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [formData, setFormData] = useState({
    candidateId: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(API_CANDIDATE_GETALL, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        const data = response.data.data;
        setCandidates(data);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.error);
        } else {
          alert(error.message);
        }
      }
    };

    fetchCandidates();
  }, []);

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setFormData({
        ...formData,
        file: target.files[0],
      });
    }
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formDataApi = new FormData();
    formDataApi.append("file", formData.file as Blob);

    try {
      const response = await axios.post(
        `${API_CREDIBILITY}/${formData.candidateId}`,
        formDataApi,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload berhasil:", response.data);
      setSuccess(true);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#ECF8F7", minHeight: "100vh" }}>
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-none mt-5"
          style={{ backgroundColor: "#ECF8F7", width: "90%" }}
        >
          <form className="px-5 py-4" onSubmit={handleFormSubmit}>
            <h3>Tambahkan Tingkat Kredibilitas Kandidat</h3>

            <div className="mb-3">
              <label htmlFor="candidateId" className="form-label">
                Pilih Kandidat
              </label>
              <select
                className="form-select"
                id="candidateId"
                value={formData.candidateId}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Kandidat</option>
                {candidates &&
                  candidates.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                      {candidate.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Unggah File Excel
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" className="my-1 btn btn-primary">
              Submit
            </button>

            {loading && (
              <div className="mt-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {success && (
              <div className="alert alert-success mt-3" role="alert">
                Upload berhasil!
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
