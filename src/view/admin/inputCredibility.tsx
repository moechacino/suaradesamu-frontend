import Navbar from "../../components/Navbar";
import TambahCredibility from "../../components/TambahCredibility";

export default function InputCredibility() {
  return (
    <div style={{ backgroundColor: "#ECF8F7", minHeight: "100vh" }}>
      <Navbar />
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div class="col">
          <div class="row">
            <TambahCredibility />
          </div>
        </div>
      </section>
    </div>
  );
}
