import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "preact/hooks";
import axios, { AxiosError } from "axios";
import {
  API_CANDIDATE_GETALL,
  API_VOTER_GETALL,
  API_VOTES_GETALL,
} from "../../env";
import { Candidate } from "../../types/candidate";
import { Voter } from "../../types/Voter";
import Cookies from "js-cookie";
import ChartComponent from "../../components/Chart";
import { Votes } from "../../types/Votes";
import CandidateImage from "../../components/CandidateImage";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [candidateTotalVotes, setCandidateTotalVotes] = useState([]);
  const [realCount, setRealCount] = useState<Votes | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(API_CANDIDATE_GETALL, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        console.log(response.data);
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

    const fetchVoters = async () => {
      try {
        const response = await axios.get(API_VOTER_GETALL, {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setVoters(data);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.error);
        } else {
          alert(error.message);
        }
      }
    };

    const fetchRealCount = async () => {
      try {
        const response = await axios.get(API_VOTES_GETALL, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        const data = response.data.data;
        setCandidateTotalVotes(data.candidateVotesCount);
        setRealCount(data);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.error);
        } else {
          alert(error.message);
        }
      }
    };
    fetchRealCount();
    fetchCandidates();
    fetchVoters();
  }, []);

  return (
    <div style="background-color: #ECF8F7; min-height: 100vh;">
      <Navbar />
      <section class="pb-5 d-flex justify-content-center align-items-center">
        <div
          class="card shadow-none mt-5"
          style="background-color: #ECF8F7; width: 90%;"
        >
          <div class="row">
            <div class="col">
              <div class="container text-center mt-3 mb-3">
                <h2 class="mt-3">Daftar Kandidat</h2>
                <table class="table table-success" style="width: 100%;">
                  <thead>
                    <tr class="text-white">
                      <th scope="col">No Urut</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Umur</th>
                      <th scope="col">Visi</th>
                      <th scope="col">Pengalaman Organisasi</th>
                      <th scope="col">Pengalaman Kerja</th>
                      <th scope="col">Program Kerja</th>
                      <th scope="col">Pendidikan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates && candidates.length > 0 ? (
                      candidates.map((candidate: Candidate) => (
                        <tr key={candidate.id}>
                          <td>{candidate.noUrut}</td>
                          <td>
                            <CandidateImage
                              photoProfileUrl={candidate.photoProfileUrl}
                              photoProfileAlt={candidate.photoProfileAlt}
                              width="30px"
                              height="30px"
                            />
                          </td>
                          <td>{candidate.name}</td>
                          <td>{candidate.age}</td>
                          <td>{candidate.visi}</td>
                          <td>
                            {candidate.organization &&
                            candidate.organization.length > 0
                              ? candidate.organization.map((org, index) => (
                                  <div key={org.id}>
                                    <div>
                                      <h6>
                                        {index + 1}.{org.title}
                                      </h6>
                                    </div>
                                    <div>
                                      {org.periodStart}-{org.periodEnd}
                                    </div>
                                  </div>
                                ))
                              : "-"}
                          </td>
                          <td>
                            {candidate.workExperience &&
                            candidate.workExperience.length > 0
                              ? candidate.workExperience.map((exp, index) => (
                                  <div key={exp.id}>
                                    <div>
                                      <h6>
                                        {index + 1}.{exp.title}
                                      </h6>
                                    </div>
                                    <div>
                                      {exp.periodStart}-{exp.periodEnd}
                                    </div>
                                  </div>
                                ))
                              : "-"}
                          </td>
                          <td>
                            {candidate.workPlan && candidate.workPlan.length > 0
                              ? candidate.workPlan.map((plan, index) => (
                                  <div key={plan.id}>
                                    <div>
                                      <h6>
                                        {index + 1}.{plan.title}
                                      </h6>
                                    </div>
                                    <div>
                                      <p>{plan.detail}</p>
                                    </div>
                                  </div>
                                ))
                              : "-"}
                          </td>
                          <td>
                            {candidate.education &&
                            candidate.education.length > 0
                              ? candidate.education.map((edu, index) => (
                                  <div key={edu.id}>
                                    <div>
                                      <h6>
                                        {index + 1}.{edu.degree}
                                      </h6>
                                    </div>
                                    <div>
                                      <h6>{edu.institution}</h6>
                                    </div>
                                    <div>
                                      {edu.periodStart}-{edu.periodEnd}
                                    </div>
                                  </div>
                                ))
                              : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} class="text-center">
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div class="col">
                <section className="d-flex justify-content-center align-items-center">
                  <div
                    className="card shadow-none "
                    style={{ backgroundColor: "#ECF8F7", width: "90%" }}
                  >
                    <div className="row justify-content-center">
                      <div className="col text-center">
                        <h5>Status Pemilihan</h5>
                        <p>
                          {realCount
                            ? realCount.isVotingRun
                              ? "Sedang Berjalan"
                              : "Selesai"
                            : ""}
                        </p>
                      </div>
                      <div className="col text-center">
                        <h5>Total Suara</h5>
                        <p>{realCount ? realCount.totalPemilih : "-"}</p>
                      </div>
                      <div className="col text-center">
                        <h5>Total Suara Masuk</h5>
                        <p>{realCount ? realCount.totalSuaraMasuk : "-"}</p>
                      </div>
                      <div className="col text-center">
                        <h5>%</h5>
                        <p>
                          {realCount
                            ? realCount.totalSuaraMasukDalamPersen
                            : "-"}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div class="col">
                <section className="d-flex justify-content-center align-items-center">
                  <div
                    className="card shadow-none mt-5"
                    style={{ backgroundColor: "#ECF8F7", width: "90%" }}
                  >
                    <div className="container text-center mt-3 mb-3">
                      <h2 className="mt-3">Grafik Suara Kandidat</h2>
                      {candidateTotalVotes.length === 0 ? (
                        <p>Hasil Suara hanya muncul ketika voting selesai</p>
                      ) : (
                        ""
                      )}
                      <ChartComponent data={candidateTotalVotes} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div class="col">
              <div class="container text-center mt-3 mb-3">
                <h2 class="mt-3">Daftar Pemilih</h2>
                <table class="table table-success" style="width: 100%;">
                  <thead>
                    <tr class="text-white">
                      <th scope="col">#</th>
                      <th scope="col">Serial Number</th>
                      <th scope="col">NIK</th>
                      <th scope="col">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voters && voters.length > 0 ? (
                      voters.map((voter: Voter, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{voter.nfcSerialNumber}</td>
                          <td>{voter.NIK}</td>
                          <td>{voter.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} class="text-center">
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
