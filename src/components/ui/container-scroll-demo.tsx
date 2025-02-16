
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function ContainerScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[500px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Experience the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Electric Mobility
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/lovable-uploads/ec960a52-1e70-4d52-b6c3-d8e1af41e121.png"
          alt="Tesla Fleet"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center shadow-2xl"
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Premium Features <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Cutting-Edge Technology
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/lovable-uploads/2f3ebc7e-63b4-418f-abbf-b878a891738f.png"
          alt="Tesla Interior"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center shadow-2xl"
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Drive Into The Future <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Join Our Fleet Today
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/lovable-uploads/4b7e3823-919f-4e0e-876b-56ac588be56f.png"
          alt="Tesla Night"
          className="mx-auto rounded-2xl object-cover h-full w-full object-center shadow-2xl"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
