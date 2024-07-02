import { route } from "preact-router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { AxiosError } from "axios";
import { API_VOTES_POST_END, API_VOTES_POST_START } from "../env";
import Cookies from "js-cookie";
export default function Navbar() {
  function navigateToHome() {
    route("/admin/dashboard");
  }
  async function startVoting() {
    const token = Cookies.get("token");
    try {
      let isInputValid: boolean = false;
      let durationInput;
      let duration;
      while (!isInputValid) {
        durationInput = prompt("Masukkan durasi (dalam jam) :");
        if (durationInput === null) {
          alert("Input dibatalkan.");
          break;
        }

        durationInput = parseInt(durationInput, 10);

        if (!isNaN(durationInput)) {
          durationInput = true;
          break;
        } else {
          alert("Input tidak valid. Harap masukkan angka integer.");
        }
      }
      if (durationInput) {
        duration = Number(durationInput) * 3600;
      }

      const response = await axios.post(
        API_VOTES_POST_START,
        {
          durationInMiliseconds: `${duration}`,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        alert("Proses Pemilihan Telah Dimulai");
        window.location.reload();
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert(error.message);
      }
    }
  }

  async function endVoting() {
    try {
      const token = Cookies.get("token");
      console.log(token);
      const response = await axios.post(
        API_VOTES_POST_END,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        alert("Proses Pemilihan Telah Selesai");
        window.location.reload();
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert(error.message);
      }
    }
  }

  function navigateToInputCandidate() {
    route("/admin/dashboard/input-candidate");
  }

  function naviagateToInputCredibility() {
    route("/admin/dashboard/input-credibility");
  }
  return (
    <>
      <section class="d-flex justify-content-center align-items-center">
        <div
          class="card shadow-none mt-5"
          style="background-color: #ECF8F7; width: 90%;"
        >
          <div class="container text-center mt-3 mb-3">
            <div class="row">
              <div class="col d-flex justify-content-center">
                <button
                  onClick={navigateToHome}
                  class="btn btn-custom-tosca py-3 px-5"
                >
                  HOME
                </button>
              </div>
              <div class="col d-flex justify-content-center">
                <button onClick={startVoting} class="btn btn-warning py-3 px-5">
                  START VOTING
                </button>
              </div>
              <div class="col d-flex justify-content-center">
                <button
                  onClick={endVoting}
                  class="btn btn-custom-red py-3 px-5"
                >
                  END VOTING
                </button>
              </div>
              <div class="col d-flex justify-content-center">
                <button
                  onClick={navigateToInputCandidate}
                  class="btn btn-custom-tosca py-3 px-5"
                >
                  INPUT KANDIDAT
                </button>
              </div>
              <div class="col d-flex justify-content-center">
                <button
                  onClick={naviagateToInputCredibility}
                  class="btn btn-custom-tosca py-3 px-5"
                >
                  KREDIBILITAS KANDIDAT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
