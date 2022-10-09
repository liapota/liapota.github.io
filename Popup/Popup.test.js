import React from "react";
// eslint-disable-next-line no-unused-vars
import { shallow, mount } from "enzyme";
import Popup from "./Popup";
import Button from "../Button";

describe("<Popup />", () => {
  it("has a title", () => {
    const wrapper = shallow(
      <Popup
        title={"Title!Title!"}
        onClose={() => {}}
      />
      ,
    );
    expect(wrapper.find(".ati-core-popup-header").props().children).toEqual("Title!Title!");
  });

  it("correct close", () => {
    let count = 0;
    const wrapper = shallow(
      <Popup
        onClose={() => count++}
      />
      ,
    );
    wrapper.find(".ati-core-close-button").simulate("click");
    expect(count).toBe(1);
  });

  it("check className", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        className="className"
      />
      ,
    );
    expect(wrapper.find(".popup-container.className").length).toEqual(1);
  });

  it("check noBackdrop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        noBackdrop
      />
      ,
    );
    expect(wrapper.find(".popup-container.no-backdrop").length).toEqual(1);
  });

  it("check primaryAction button", () => {
    let count = 0;

    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        primaryAction={
          {
            name: "name",
            action: () => count++,
          }
        }
      />,
    );

    const button = wrapper.find(".ati-core-popup-button").dive().find("button");
    expect(button.text()).toEqual("name");

    const fakeEvent = { preventDefault: () => count++ };
    button.simulate("click", fakeEvent);
    expect(count).toBe(2);
  });

  it("check alternateAction button", () => {
    let count = 0;

    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        primaryAction={
          {
            name: "name1",
            action: () => count--,
          }
        }
        alternateAction={
          {
            name: "name2",
            action: () => count++,
          }
        }
      />,
    );

    const button = wrapper.find(".action-link");
    expect(button.text()).toBe("name2");

    button.simulate("click");
    expect(count).toBe(1);
  });

  it("check hideCloseButton prop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        hideCloseButton
      />,
    );

    expect(wrapper.find(".popup-container .ati-core-close-button").length).toEqual(0);
  });

  it("check whiteActionArea prop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        whiteActionArea
      />,
    );

    expect(wrapper.find(".popup-container .ati-core-text-content--white").length).toEqual(1);
  });

  it("check small prop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        small
      />,
    );

    expect(wrapper.find(".popup-container .ati-core-popup-content--small").length).toEqual(1);
  });

  it("check isPrimaryActionLoading prop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        isPrimaryActionLoading
        primaryAction={
          {
            name: "name1",
            action: () => {},
          }
        }
      />,
    );
    expect(wrapper.find(Button).prop("isLoading")).toEqual(true);
  });

  it("check hideCloseButton prop", () => {
    const wrapper = shallow(
      <Popup
        onClose={() => {}}
        hideCloseButton
      />,
    );

    expect(wrapper.find(".popup-container .ati-core-close-button").length).toEqual(0);
  });

  it("check closeOnEscape function", () => {
    let count = 0;

    const wrapper = shallow(
      <Popup
        onClose={() => count++}
        closeOnEscape
        id="identificator"
      />,
    );

    const event = { type: "keyup", which: 27 };
    wrapper.instance().outerClick(event);
    expect(count).toBe(1);
  });

  it("check closeOnOverlayClick function", () => {
    let count = 0;

    const wrapper = shallow(
      <Popup
        onClose={() => count++}
        closeOnOverlayClick
        id="identificator"
      />,
    );
    const targetNode = wrapper.instance().container.current;
    const event = { type: "mousedown", target: targetNode };

    wrapper.instance().outerClick(event);
    expect(count).toBe(1);
  });

  it("check handleClose function", () => {
    let count = 0;

    const wrapper = shallow(
      <Popup
        onClose={() => count++}
        closeOnOverlayClick
        id="identificator"
      />,
    );

    wrapper.instance().handleClose();
    expect(count).toBe(1);
  });

  it("check container node existance", () => {
    const wrapper = mount(
      <Popup
        onClose={() => false}
        id="identificator"
      />,
    );

    const container = wrapper.instance().container.current;
    expect(container).toBeDefined();
  });

  it("check core node existance", () => {
    const wrapper = mount(
      <Popup
        onClose={() => false}
        id="identificator"
      />,
    );

    const core = wrapper.instance().core.current;

    expect(core).toBeDefined();
  });

  /*
  it("check ignoreBodyOverflow prop", () => {
    const wrapper = mount(
      <Popup
        onClose={() => {}}
        ignoreBodyOverflow
      />,
      { attachTo: document.body },
    );
    expect(wrapper.find(".popup-container").length).toEqual(1);
    expect(document.body.style.overflow).toEqual("");
  });
  */
});
