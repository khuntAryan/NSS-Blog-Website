"use client";

import { StickyScroll } from "../components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "World Blood Donor Day",
    description:
      "Every drop counts. Join us in celebrating World Blood Donor Day and help save lives.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://media.istockphoto.com/id/1414901355/vector/world-blood-donor-day-vector-background.jpg?s=612x612&w=0&k=20&c=rOcujEhfwrptwsq1YZxQv6mibq0Woq0T5Q4VDWo7C5A="
          alt="World Blood Donor Day"
          className="h-full w-full object-cover rounded-xl shadow-lg"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
];

const Event = () => {
  return (
    <div className="w-full py-10 px-4">
      <StickyScroll content={content} />
    </div>
  );
};

export default Event;
