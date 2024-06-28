import axios from "axios";
import { useEffect, useState } from "preact/hooks";

export default function CandidateImage({
  photoProfileUrl,
  photoProfileAlt,
  width = "25px",
  height = "25px",
}: {
  photoProfileUrl: string;
  photoProfileAlt: string;
  width?: string;
  height?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(photoProfileUrl, {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [photoProfileUrl]);

  return (
    <img
      src={imageSrc || ""}
      alt={photoProfileAlt}
      style={{ width: width, height: height }}
      loading="eager"
    />
  );
}
