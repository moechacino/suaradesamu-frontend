import { useEffect, useState } from "preact/hooks";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

import { API_CANDIDATE_GETALL, API_WORKPLAN_POST_CREATE } from "../env";
import { Candidate } from "../types/candidate";
interface WorkPlanFormData {
  title: string;
  detail: string;
  candidateId: string;
}

export default function InputWorkPlan() {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState<WorkPlanFormData>({
    title: "",
    detail: "",
    candidateId: "",
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(API_CANDIDATE_GETALL, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        setCandidates(response.data.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
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

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const { title, detail, candidateId } = formData;

    try {
      const response = await axios.post(
        `${API_WORKPLAN_POST_CREATE}/${candidateId}`,
        {
          title,
          detail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respon dari server:", response.data);
      alert("Data Program Kerja berhasil ditambahkan.");

      setFormData({
        title: "",
        detail: "",
        candidateId: "",
      });
    } catch (error) {
      console.error("Error mengirim data:", error);
      alert("Gagal menambahkan Program Kerja. Silakan coba lagi.");
    }
  };

  return (
    <div style={{ backgroundColor: "#ECF8F7" }}>
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-none mt-5"
          style={{ backgroundColor: "#ECF8F7", width: "90%" }}
        >
          <form className="px-5 py-4" onSubmit={handleFormSubmit}>
            <h3>Tambahkan Program Kerja</h3>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Judul Program Kerja
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="detail" className="form-label">
                Detail
              </label>
              <input
                type="text"
                className="form-control"
                id="detail"
                value={formData.detail}
                onChange={handleInputChange}
                required
              />
            </div>

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
                {candidates && candidates.length > 0
                  ? candidates.map((candidate) => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <button type="submit" className="my-1 btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
