import client from "../../../client";
import { uploadToS3 } from "../../../utils/upload.utils";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    upload: protectedResolver(async (_, { file, title, description }, { loggedInUser }) => {
      const fileUrl = await uploadToS3(file, loggedInUser.id, "apollo-youtube-video");
      const newVideo = await client.video.create({ data: { file: fileUrl, title, description, userId: loggedInUser.id } });
      console.log(newVideo);
      return newVideo;
    })
  }
}