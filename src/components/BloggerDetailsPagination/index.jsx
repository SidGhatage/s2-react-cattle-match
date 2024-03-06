import React from "react";
import { Img, Text } from "./..";

export default function BloggerDetailsPagination({
  grouptwentyfive = "1",
  grouptwentyfour = "2",
  next = "Next",
  ...props
}) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start h-10 w-10">
        <Text
          as="p"
          className="flex justify-center items-center h-10 w-10 !text-white-A700 !font-normal bg-indigo-900 text-center rounded-[50%]"
        >
          {grouptwentyfive}
        </Text>
      </div>
      <div className="flex flex-col items-center justify-start h-10 w-10 ml-5">
        <Text
          as="p"
          className="flex justify-center items-center h-10 w-10 !text-indigo-900 !font-normal bg-white-A700 text-center rounded-[50%]"
        >
          {grouptwentyfour}
        </Text>
      </div>
      <div className="flex flex-row justify-start items-center w-[34%] ml-10 gap-[15px]">
        <Text as="p" className="!text-indigo-900">
          {next}
        </Text>
        <Img src="images/defaultNoData.png" alt="arrowpointing" className="h-4 w-4" />
      </div>
    </div>
  );
}
