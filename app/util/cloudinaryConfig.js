import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});
//console.log("CLOUD CREATED");
export { cld };
