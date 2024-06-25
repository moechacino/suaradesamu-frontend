import InputOrganization from "../../components/InputOrganization";
import InputWorkExperience from "../../components/InputWorkExperience";
import InputWorkPlan from "../../components/InputWorkPlan";
import Navbar from "../../components/Navbar";
import TambahKandidat from "../../components/TambahKandidat";
import InputEducation from "../../components/inputEducation";

export default function InputCandidate() {
  return (
    <div style={{ backgroundColor: "#ECF8F7", minHeight: "100vh" }}>
      <Navbar />
      <section className="pb-5 d-flex justify-content-center align-items-center">
        <div class="col">
          <div class="row">
            <TambahKandidat />
          </div>
          <div class="row">
            <div class="col">
              <InputOrganization />
            </div>
            <div class="col">
              <InputWorkExperience />
            </div>
            <div class="col">
              <InputWorkPlan />
            </div>
            <div class="col">
              <InputEducation />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
