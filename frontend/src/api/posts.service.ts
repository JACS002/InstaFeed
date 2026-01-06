import api from "./axios";

export const uploadPost = async (file: File, caption: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("caption", caption);

  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export async function getFeed() {
  const response = await api.get("/feed");
  return response.data.posts;
}

export async function deletePost(postId: string) {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
}
