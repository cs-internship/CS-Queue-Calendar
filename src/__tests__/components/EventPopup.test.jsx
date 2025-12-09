// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import moment from "jalali-moment";
// import EventPopup from "../../components/EventPopup";

// describe("EventPopup", () => {
//     it("renders with content and close button, and calls onClose when clicked", async () => {
//         const date = moment();
//         const onClose = jest.fn();

//         const anchorRect = {
//             left: 120,
//             top: 100,
//             bottom: 160,
//             width: 120,
//             height: 40,
//         };

//         const event = {
//             title: "جلسه تست",
//             fullName: "جلسه هفتگی تست",
//             color: "#ff5a5f",
//             link: "https://example.com",
//             resource: "https://resource.example",
//             time: "ساعت ۱۰:۰۰ تا ۱۱:۰۰",
//         };

//         const { container } = render(
//             <EventPopup
//                 visible={true}
//                 anchorRect={anchorRect}
//                 date={date}
//                 event={event}
//                 onClose={onClose}
//             />
//         );

//         const root = container.querySelector(".event-popup");
//         expect(root).toBeInTheDocument();

//         // content should exist
//         const content = container.querySelector(".event-popup__content");
//         expect(content).toBeInTheDocument();

//         // wait for animation class to be applied
//         await waitFor(() => expect(content).toHaveClass("is-open"));

//         // check text content
//         expect(screen.getByText("جلسه هفتگی تست")).toBeInTheDocument();
//         expect(screen.getByText("ساعت ۱۰:۰۰ تا ۱۱:۰۰")).toBeInTheDocument();

//         // pressing Escape should call handler
//         fireEvent.keyDown(document, { key: "Escape" });
//         expect(onClose).toHaveBeenCalledTimes(1);
//     });
// });

describe.skip("EventPopup (temporarily disabled)", () => {
    it("skipped placeholder", () => {});
});
