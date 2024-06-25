import { AnyComponent, h } from "preact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import axios, { AxiosError } from "axios";
import { API_ADMIN_LOGIN } from "../../env.ts";
import { useState } from "preact/hooks";
import { route } from "preact-router";
import Cookies from "js-cookie";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function inputHandler(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.name === "username") {
      setUsername(target.value);
    }
    if (target.name === "password") {
      setPassword(target.value);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post(API_ADMIN_LOGIN, {
        username,
        password,
      });
      const token = response.data.data.token;
      console.log(response.data);
      Cookies.set("token", token);
      route("/admin/dashboard", true);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      } else {
        alert(error.message);
      }
    }
  }
  return (
    <>
      <section class="text-center">
        <div
          class="p-5"
          style="
          background-color: #00A58E;
          height: 300px;
        "
        ></div>

        <div
          class="card mx-20 mx-md-5 shadow-none bg-light"
          style="background-color: #E8EDF1; margin-top: -100px"
        >
          <div class="card-body py-5 px-md-5">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <h2 class="fw-bold mb-5">Login Admin</h2>
                <form onSubmit={handleSubmit}>
                  <div class="mb-4">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      class="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={inputHandler}
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={inputHandler}
                    />
                  </div>
                  <button type="submit" class="btn btn-custom btn-block mb-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
