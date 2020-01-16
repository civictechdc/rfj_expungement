import { shallow } from "enzyme";
import BodyView from "../components/BodyView";

it("An example component test", () => {
  const component = shallow(<BodyView />);
  expect(component.find("div").exists()).toBe(true);
  expect(component.find("div").text()).toMatch(/Produced with ❤️/);
});
