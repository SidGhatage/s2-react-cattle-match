import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading, Button } from "../../components";
import companyLogo from "../../assets/images/Adis Logo.png";

export default function LandingPagePage() {
  const [showModal, setShowModal] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [deadCattleImage, setDeadCattleImage] = useState(null);
  const [liveCattleImage, setLiveCattleImage] = useState(null);
  const [matchedImagePath, setMatchedImagePath] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageUrl = 'http://localhost:5000/image';

  const handleUpload = (type) => {
    setUploadType(type);
    setShowModal(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const formData = new FormData();
        formData.append("files[]", file);

        try {
          const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            if (uploadType === "deadCattle") {
              setDeadCattleImage(reader.result);
            } else if (uploadType === "liveCattle") {
              setLiveCattleImage(reader.result);
            }
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckResult = async () => {
    setLoading(true); 

    try {
      const processResponse = await fetch("http://127.0.0.1:5000/process_images", {
        method: "POST",
      });

      if (processResponse.ok) {
        const processData = await processResponse.json();
        if (processData.matched_image_path) {
          setMatchedImagePath(processData.matched_image_path);
        }
      } else {
        console.error("Failed to process images");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cattle_Matching_Feature</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div style={{ backgroundColor: "#C5FFF8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <img src={companyLogo} alt="Company Logo" className="absolute top-4 right-4 w-24 h-32" />
        <div className="flex flex-col items-center justify-center gap-[95px]">
          <div className="flex flex-col items-center justify-center max-w-[1111px]">
            <div className="flex flex-col items-center justify-center w-full gap-[30px]">
              <Heading size="3xl" as="h1" className="!font-merriweather text-center text-indigo mt-8">
                Upload the Dead Cattle Image!
              </Heading>
              <Text size="lg" as="p" className="w-[78%] !text-indigo text-center leading-[35px] mb-4">
                Please upload an image of the cattle from the same angle. This will ensure accurate matching and analysis.
              </Text>
            </div>
            <div className="flex items-center justify-center w-full gap-[25px]">
              <Button
                color="indigo_900_01"
                size="4xl"
                className="!text-white-A700 tracking-[0.12px] shadow-sm min-w-[221px] rounded-[35px]"
                onClick={() => handleUpload("deadCattle")}
              >
                Upload Dead Cattle
              </Button>
              <Button
                color="indigo_900_01"
                size="4xl"
                className="!text-white-A700 tracking-[0.12px] shadow-sm min-w-[221px] rounded-[35px]"
                onClick={() => handleUpload("liveCattle")}
              >
                Upload Live Cattle
              </Button>
              <Button
                color="indigo_200"
                size="4xl"
                variant="outline"
                className="tracking-[0.12px] min-w-[271px] rounded-[35px]"
                onClick={handleCheckResult}
              >
                Check the Result
              </Button>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modal flex justify-center items-center mt-4">
            <div className="modal-content">
              <input type="file" name={uploadType} onChange={handleImageUpload} style={{ textAlign: 'center' }} /> 
            </div>
          </div>
        )}
        {loading && <div className="loader mt-4 flex justify-center items-center">Loading...</div>}
        <div className="flex justify-center mt-8">
          {deadCattleImage && <img src={deadCattleImage} alt="Dead Cattle" className="w-48 h-48 object-cover mr-4" />}
          {liveCattleImage && <img src={liveCattleImage} alt="Live Cattle" className="w-48 h-48 object-cover ml-4" />}
        </div>
        {matchedImagePath && (
          <div className="flex justify-center mt-8">
            <img src={imageUrl} alt="Image from Flask" onError={(event) => {
              event.target.src = 'matched_image.png'; 
            }} />
          </div>
        )}
      </div>
    </>
  );
}
