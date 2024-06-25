import { useEffect, useState } from "preact/hooks";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

import {
  API_CANDIDATE_GETALL,
  API_EDUCATION_POST_CREATE,
  API_WORKEXPERIENCE_POST_CREATE,
} from "../env";
import { Candidate } from "../types/candidate";
interface EducationFormData {
  degree: string;
  institution: string;
  periodStart: string;
  periodEnd?: string | null;
  candidateId: string;
}

export default function InputEducation() {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState<EducationFormData>({
    degree: "",
    institution: "",
    periodStart: "",
    periodEnd: null,
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

    const { degree, institution, periodStart, periodEnd, candidateId } =
      formData;

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(periodStart)) {
      alert("Format tanggal harus YYYY-MM-DD");
      return;
    }

    if (periodEnd && !dateFormatRegex.test(periodEnd)) {
      alert("Format tanggal harus YYYY-MM-DD");
      return;
    }

    try {
      const response = await axios.post(
        `${API_EDUCATION_POST_CREATE}/${candidateId}`,
        {
          degree,
          institution,
          periodStart,
          periodEnd,
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
      alert("Data Pendidikan berhasil ditambahkan.");

      setFormData({
        degree: "",
        institution: "",
        periodStart: "",
        periodEnd: null,
        candidateId: "",
      });
    } catch (error) {
      console.error("Error mengirim data:", error);
      alert("Gagal menambahkan Pendidikan. Silakan coba lagi.");
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
            <h3>Tambahkan Riwayat Pendidikan</h3>
            <div className="mb-3">
              <label htmlFor="degree" className="form-label">
                Gelar
              </label>
              <input
                type="text"
                className="form-control"
                id="degree"
                value={formData.degree}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="institution" className="form-label">
                Institusi
              </label>
              <input
                type="text"
                className="form-control"
                id="institution"
                value={formData.institution}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="periodStart" className="form-label">
                Tanggal Mulai
              </label>
              <input
                type="date"
                className="form-control"
                id="periodStart"
                value={formData.periodStart}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="periodEnd" className="form-label">
                Tanggal Berakhir (opsional)
              </label>
              <input
                type="date"
                className="form-control"
                id="periodEnd"
                value={formData.periodEnd || ""}
                onChange={handleInputChange}
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
