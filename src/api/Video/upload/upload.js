import client from "../../../client";
import { uploadToS3 } from "../../../utils/upload.utils";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    upload: protectedResolver(async (_, { file, thumbnail, title, description }, { loggedInUser }) => {
      try {
        const fileUrl = await uploadToS3(file, loggedInUser.id, "apollo-youtube-video");
        const thumbnailUrl = await uploadToS3(thumbnail, loggedInUser.id, "apollo-youtube-video/thumbnail")
        const newVideo = await client.video.create({ data: { file: fileUrl, thumbnail: thumbnailUrl, title, description, userId: loggedInUser.id } });
        console.log(newVideo);
        return newVideo;
      } catch (err) {
        console.log(err)
      }
    })
  }
}