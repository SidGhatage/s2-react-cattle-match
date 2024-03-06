import React from "react";
import { Text, Img, Heading } from "./..";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex flex-col items-center justify-center w-[81%] mt-[30px] gap-[66px] mx-[132px]">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start w-[15%] gap-2">
            <div className="flex flex-row justify-start items-start gap-3.5">
              <Img src="images/img_dashicons_welcome_write_blog.svg" alt="dashicons_one" className="h-6 w-6 mt-[3px]" />
              <Heading size="lg" as="h4" className="!text-white-A700 !font-nunitosans uppercase text-center">
                Blogsly
              </Heading>
            </div>
            <div className="flex flex-row justify-start items-center gap-2.5">
              <Img src="images/img_heart_3_1.svg" alt="heart3one_one" className="h-5 w-5" />
              <Text as="p" className="!text-white-A700 !font-medium">
                Build with heart
              </Text>
            </div>
          </div>
          <div className="flex flex-row justify-between w-auto gap-[50px]">
            <Text as="p" className="!text-white-A700">
              Home
            </Text>
            <Text as="p" className="!text-white-A700">
              Podcast
            </Text>
            <Text as="p" className="!text-white-A700">
              Blog
            </Text>
            <Text as="p" className="!text-white-A700">
              About
            </Text>
            <Text as="p" className="!text-white-A700">
              Contact
            </Text>
          </div>
          <div className="flex flex-col items-center justify-start w-[11%] gap-[19px]">
            <Heading as="h6" className="!text-white-A700 text-center">
              Follow Me on
            </Heading>
            <div className="flex flex-row justify-between w-full">
              <Img src="images/img_instagram_3_1.svg" alt="instagram3one" className="h-[25px] w-[25px]" />
              <Img src="images/img_whatsapp_2_1.svg" alt="whatsapp2one" className="h-[25px] w-[25px]" />
              <Img src="images/img_linkedin_2_1.svg" alt="linkedin2one" className="h-[25px] w-[25px]" />
            </div>
          </div>
        </div>
        <Text size="xs" as="p" className="!text-white-A700">
          Powered by Blogsly
        </Text>
      </div>
    </footer>
  );
}
