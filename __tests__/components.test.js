import { shallow } from "enzyme";
import BodyView from "../components/BodyView";
import CaseRow from "../components/CaseRow";

it("An example component test", () => {
  const component = shallow(<BodyView />);
  expect(component.find("div").exists()).toBe(true);
  expect(component.find("div").text()).toMatch(/Produced with ❤️/);
});

it("Make sure CaseRow doesn't crash", () => {
  const component = shallow(<CaseRow key="1" charge="Charge 1" />);
  expect(component.exists()).toBe(true);
});
